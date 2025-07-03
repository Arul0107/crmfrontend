import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

// Helper function to format currency (Indian Rupees)
const formatCurrency = (amount) => {
  const numAmount = parseFloat(amount) || 0;
  return `₹${numAmount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Helper function to convert number to words (Simplified for example)
// For a robust solution, you'd need a more comprehensive library or implementation.
// This version is tailored for Indian numbering system (Lakh, Crore)
const convertNumberToWords = (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return "N/A";
  }
  let number = Math.floor(num); // Use integer part for word conversion
  let decimal = Math.round((num - number) * 100); // Get decimal part

  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const scales = ["", "Thousand", "Lakh", "Crore"]; // Indian Numbering System

  const numToWords = (n) => {
    if (n < 10) return units[n];
    if (n >= 10 && n < 20) return teens[n - 10];
    return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + units[n % 10] : "");
  };

  let words = [];
  let i = 0;

  if (number === 0) {
    words.push("Zero");
  } else {
    // Process last three digits (hundreds, tens, units)
    let lastThree = number % 1000;
    if (lastThree > 0) {
      if (lastThree < 100) {
        words.push(numToWords(lastThree));
      } else {
        words.push(units[Math.floor(lastThree / 100)] + " Hundred" + (lastThree % 100 !== 0 ? " " + numToWords(lastThree % 100) : ""));
      }
    }
    number = Math.floor(number / 1000); // Remove last three digits

    // Process remaining digits in groups of two (for Lakh, Crore)
    while (number > 0) {
      let chunk = number % 100; // Get last two digits
      if (chunk > 0) {
        words.push(numToWords(chunk) + " " + scales[++i]); // Increment scale index
      } else {
        i++; // Still increment scale index even if chunk is zero for correct placement
      }
      number = Math.floor(number / 100); // Remove last two digits
    }
  }

  const finalWords = words.reverse().filter(Boolean).join(" ").trim(); // Filter out empty strings
  let result = finalWords ? finalWords + " Rupees" : "Zero Rupees";

  if (decimal > 0) {
    result += ` and ${numToWords(decimal)} Paisa`;
  }
  result += " Only";

  return result.replace(/\s+/g, ' '); // Replace multiple spaces with single space
};


// This function generates the HTML content for the PDF in TWO distinct parts (pages)
const generateQuotationHtmlParts = (quotation) => {
  // Calculate totals first so they are available for both parts
  const subTotalAmount =
    quotation.items?.reduce(
      (sum, item) => sum + (item.quantity || 0) * (item.rate || 0),
      0
    ) || 0;

  const gstRate = 0.18; // Assuming 18% GST as per image
  const gstAmount = subTotalAmount * gstRate;
  const billAmount = subTotalAmount + gstAmount;

  // Re-useable Header HTML (common for both pages, adjusted for image match)
  const commonHeaderHtml = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
      <div style="display: flex; align-items: center;">
        <div style="display: flex; margin-right: 15px;">
          <div style="width: 25px; height: 60px; background: #ff6600; margin-right: 2px;"></div>
          <div style="width: 25px; height: 60px; background: #ff6600; margin-right: 2px;"></div>
          <div style="width: 25px; height: 60px; background: #ff6600; margin-right: 10px;"></div>
        </div>

        <div>
          <h2 style="margin: 0; font-size: 18px; font-weight: bold; color: #000; margin-bottom: 5px;">ACE AUTOMATION</h2>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">S.F. No. 91, 14B, Padiveedu Thottam,</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">Kalapatty road, Saravanampatti (PO),</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">Coimbatore - 641 035. TN, INDIA.</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">+91 98422 53389</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">aceautomation.cbe@gmail.com</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">www.aceautomation.in</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">GST No. : 33AVDPD3093Q1ZD</p>
        </div>
      </div>

      <div style="background: #ff6600; color: white; padding: 12px 20px; font-weight: bold; font-size: 18px; text-align: center;">
        QUOTATION
      </div>
    </div>
    <div style="border-bottom: 1px solid #ccc; margin-bottom: 15px;"></div>
  `;

  // --- Content for Page 1: Main Quotation Details and Items (matching image_315d22.png) ---
  const page1Html = `
    <div style="padding: 15px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; border: 2px solid #000;">
      ${commonHeaderHtml}

      <div style="margin-bottom: 20px; page-break-inside: avoid;">
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; width: 25%; background: #f9f9f9;">Company Name</td>
            <td style="border: 1px solid #ccc; padding: 6px; width: 25%;">: ${
              quotation.businessName || "N/A"
            }</td>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; width: 25%; background: #f9f9f9;">Date</td>
            <td style="border: 1px solid #ccc; padding: 6px; width: 25%;">: ${
              quotation.date
                ? new Date(quotation.date).toLocaleDateString("en-IN")
                : new Date().toLocaleDateString("en-IN")
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Contact Person</td>
            <td style="border: 1px solid #ccc; padding: 6px;">: ${
              quotation.customerName || "N/A"
            }</td>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Quotation No</td>
            <td style="border: 1px solid #ccc; padding: 6px;">: ${
              quotation.quotationNumber || "N/A"
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Contact Number</td>
            <td style="border: 1px solid #ccc; padding: 6px;">: ${
              quotation.customerPhone || "N/A"
            }</td>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Customer GST No.</td>
            <td style="border: 1px solid #ccc; padding: 6px;">: ${
              quotation.gstin || "N/A" // Using gstin from selected business in form
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Contact Email</td>
            <td style="border: 1px solid #ccc; padding: 6px;" colspan="3">: ${
              quotation.customerEmail || "N/A" // Added customer email
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Address</td>
            <td style="border: 1px solid #ccc; padding: 6px;" colspan="3">: ${
              quotation.businessInfo?.replace(/\n/g, '<br>') || "N/A" // Use businessInfo and handle new lines for address
            }</td>
          </tr>
        </table>
      </div>

      ${
        quotation.items?.length > 0
          ? `
          <div style="margin-top: 20px; page-break-inside: avoid;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; table-layout: fixed;">
              <colgroup>
                <col style="width: 8%;"> <col style="width: 32%;"> <col style="width: 15%;"> <col style="width: 22.5%;"> <col style="width: 22.5%;"> </colgroup>
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="border: 1px solid #ccc; padding: 8px; font-size: 12px; font-weight: bold; text-align: center;">S.No</th>
                  <th style="border: 1px solid #ccc; padding: 8px; font-size: 12px; font-weight: bold; text-align: left;">Description</th>
                  <th style="border: 1px solid #ccc; padding: 8px; font-size: 12px; font-weight: bold; text-align: center;">Quantity</th>
                  <th style="border: 1px solid #ccc; padding: 8px; font-size: 12px; font-weight: bold; text-align: right;">Unit Price (Rs.)</th>
                  <th style="border: 1px solid #ccc; padding: 8px; font-size: 12px; font-weight: bold; text-align: right;">Total (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                ${quotation.items
                  ?.map(
                    (item, idx) => `
                    <tr style="page-break-inside: avoid;">
                      <td style="border: 1px solid #ccc; padding: 8px; text-align: center; vertical-align: top;">${idx + 1}</td>
                      <td style="border: 1px solid #ccc; padding: 8px; text-align: left; vertical-align: top;">${
                        item.description || "N/A"
                      }</td>
                      <td style="border: 1px solid #ccc; padding: 8px; text-align: center; vertical-align: top;">${
                        parseFloat(item.quantity) || 0
                      }</td>
                      <td style="border: 1px solid #ccc; padding: 8px; text-align: right; vertical-align: top;">${formatCurrency(
                        item.rate || 0
                      )}</td>
                      <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold; vertical-align: top;">
                        ${formatCurrency((item.quantity || 0) * (item.rate || 0))}
                      </td>
                    </tr>
                  `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <div style="margin-top: 10px; page-break-inside: avoid;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr style="page-break-inside: avoid;">
                <td style="width: 70%;"></td> <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold; width: 15%; background: #f9f9f9;">Total Amount</td>
                <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold; width: 15%;">₹${subTotalAmount.toLocaleString("en-IN", {minimumFractionDigits: 2,maximumFractionDigits: 2,})}</td>
              </tr>
              <tr style="page-break-inside: avoid;">
                <td style="width: 70%;"></td> <td style="border: 1px solid #ccc; padding: 8px; text-align: right; width: 15%; background: #f9f9f9;">GST (18%)</td>
                <td style="border: 1px solid #ccc; padding: 8px; text-align: right; width: 15%;">₹${gstAmount.toLocaleString("en-IN", {minimumFractionDigits: 2,maximumFractionDigits: 2,})}</td>
              </tr>
              <tr style="background: #e8f5e8; page-break-inside: avoid;">
                <td style="width: 70%;"></td> <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold; font-size: 14px; width: 15%;">Bill Amount <br/> (Total Amount + Tax Value)</td>
                <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold; font-size: 14px; width: 15%;">₹${billAmount.toLocaleString("en-IN", {minimumFractionDigits: 2,maximumFractionDigits: 2,})}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 15px; border: 1px solid #ccc; padding: 8px; page-break-inside: avoid;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr>
                <td style="font-weight: bold; padding: 4px; width: 25%;">Total Amount In Words</td>
                <td style="padding: 4px; font-style: italic; width: 75%;">${convertNumberToWords(billAmount)}</td>
              </tr>
            </table>
          </div>
        `
          : ""
      }

      <div style="margin-top: 15px; font-size: 11px; page-break-inside: avoid;">
        <p style="margin: 5px 0; font-style: italic;">"We hope that you may satisfy with our prices and the specification. We expect your valuable order in this regard."</p>

        <div style="margin: 10px 0;">
          <p style="margin: 3px 0; font-weight: bold;">With Best Regards</p>
          <p style="margin: 3px 0;">For Ace Automation</p>
        </div>
      </div>

      <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 15px; page-break-inside: avoid;">
        <div style="text-align: right;">
          <p style="margin: 5px 0; font-size: 12px; font-weight: bold;">Authorized Signatory</p>
          <div style="margin-top: 40px; border-bottom: 1px solid #000; width: 200px; margin-left: auto;"></div>
        </div>
      </div>
      <p style="text-align: center; font-size: 10px; color: #666; margin-top: 20px;">Page 1/2</p>
    </div>
  `;

  // Content for Page 2: Product Specifications and General Terms (matching image_315d5e.png)
  const productSpecificationsSections = quotation.items
    ?.filter(item => item.specifications && item.specifications.length > 0) // Only include items with specifications
    .map(item => {
      // Use item.productName if available, otherwise fallback to item.description
      const productTitle = item.productName || item.description || 'Product';
      const productSpecTitleAppendix = `- ${productTitle}`;

      const productSpecificationsRows = item.specifications
        .map(
          (spec) => `
          <tr style="page-break-inside: avoid;">
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; width: 40%; background: #f9f9f9; vertical-align: top;">${spec.name || ''}</td>
            <td style="border: 1px solid #ccc; padding: 6px; vertical-align: top;">${spec.value || ''}</td>
          </tr>
        `
        )
        .join("");

      return `
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <p style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">PRODUCT SPECIFICATIONS ${productSpecTitleAppendix}</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tbody>
              ${productSpecificationsRows}
            </tbody>
          </table>
        </div>
      `;
    })
    .join("");

  // Assuming general terms come from a 'generalTerms' array in the quotation object.
  // You might need to add a field for general terms to your QuotationForm if it's user-editable.
  const generalTermsRows = quotation.generalTerms
    ? quotation.generalTerms
        .map(
          (term) => `
          <tr style="page-break-inside: avoid;">
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; width: 30%; background: #f9f9f9; vertical-align: top;">${term.name || ''}</td>
            <td style="border: 1px solid #ccc; padding: 6px; vertical-align: top;">${term.value || ''}</td>
          </tr>
        `
        )
        .join("")
    : "";


  const page2Html = `
    <div style="padding: 15px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; border: 2px solid #000;">
      ${commonHeaderHtml}

      ${productSpecificationsSections}

      ${
        quotation.generalTerms?.length > 0
          ? `
          <div style="margin-top: 15px; page-break-inside: avoid;">
            <p style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">GENERAL TERMS</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tbody>
                ${generalTermsRows}
              </tbody>
            </table>
          </div>
        `
          : ""
      }

      <div style="margin-top: 15px; font-size: 11px; page-break-inside: avoid;">
        <p style="margin: 5px 0; font-style: italic;">"We hope that you may satisfy with our prices and the specification. We expect your valuable order in this regard."</p>

        <div style="margin: 10px 0;">
          <p style="margin: 3px 0; font-weight: bold;">With Best Regards</p>
          <p style="margin: 3px 0;">For Ace Automation</p>
        </div>
      </div>

      <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 15px; page-break-inside: avoid;">
        <div style="text-align: right;">
          <p style="margin: 5px 0; font-size: 12px; font-weight: bold;">Authorized Signatory</p>
          <div style="margin-top: 40px; border-bottom: 1px solid #000; width: 200px; margin-left: auto;"></div>
        </div>
      </div>
      <p style="text-align: center; font-size: 10px; color: #666; margin-top: 20px;">Page 2/2</p>
    </div>
  `;

  return { page1Html, page2Html };
};

export const downloadQuotationPdf = async (record) => {
  const toastId = toast.loading("Generating PDF...", {
    position: "top-center",
  });

  let tempDivPage1 = null;
  let tempDivPage2 = null;

  try {
    const { page1Html, page2Html } = generateQuotationHtmlParts(record);

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const padding = 10; // 10mm padding on each side

    // --- Render Page 1 ---
    tempDivPage1 = document.createElement("div");
    tempDivPage1.style.position = "fixed";
    tempDivPage1.style.top = "-9999px";
    tempDivPage1.style.left = "-9999px";
    tempDivPage1.style.width = `${pdfWidth - 2 * padding}mm`; // Adjust for padding
    tempDivPage1.style.padding = `${padding}mm`;
    tempDivPage1.style.background = "white";
    tempDivPage1.style.zIndex = "-1";
    tempDivPage1.style.display = "block";
    tempDivPage1.innerHTML = page1Html;
    document.body.appendChild(tempDivPage1);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for rendering

    const canvasPage1 = await html2canvas(tempDivPage1, {
      scale: 2, // Increased scale for better resolution
      useCORS: true,
      logging: false,
    });

    const imgDataPage1 = canvasPage1.toDataURL("image/png");
    const imgPropsPage1 = pdf.getImageProperties(imgDataPage1);
    const imgHeightPage1 =
      (imgPropsPage1.height * (pdfWidth - 2 * padding)) / imgPropsPage1.width;

    pdf.addImage(
      imgDataPage1,
      "PNG",
      padding,
      padding,
      pdfWidth - 2 * padding,
      imgHeightPage1
    );

    // --- Render Page 2 ---
    pdf.addPage(); // Add a new page for the second part

    tempDivPage2 = document.createElement("div");
    tempDivPage2.style.position = "fixed";
    tempDivPage2.style.top = "-9999px";
    tempDivPage2.style.left = "-9999px";
    tempDivPage2.style.width = `${pdfWidth - 2 * padding}mm`; // Adjust for padding
    tempDivPage2.style.padding = `${padding}mm`;
    tempDivPage2.style.background = "white";
    tempDivPage2.style.zIndex = "-1";
    tempDivPage2.style.display = "block";
    tempDivPage2.innerHTML = page2Html;
    document.body.appendChild(tempDivPage2);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for rendering

    const canvasPage2 = await html2canvas(tempDivPage2, {
      scale: 2, // Increased scale for better resolution
      useCORS: true,
      logging: false,
    });

    const imgDataPage2 = canvasPage2.toDataURL("image/png");
    const imgPropsPage2 = pdf.getImageProperties(imgDataPage2);
    const imgHeightPage2 =
      (imgPropsPage2.height * (pdfWidth - 2 * padding)) / imgPropsPage2.width;

    // Add content to pages, splitting if necessary (for page 2, though it should ideally fit)
    let currentY = padding; // Starting Y position for content on the current page
    let contentHeightPerPage = pdfHeight - 2 * padding; // Usable height per page

    let imgCurrentY = 0; // Current Y position within the image
    while (imgCurrentY < imgHeightPage2) {
      if (currentY + contentHeightPerPage > pdfHeight && imgCurrentY > 0) {
        // If content overflows current page, add new page
        pdf.addPage();
        currentY = padding; // Reset Y for new page
      }

      // Calculate how much content to add from the image
      let heightToDraw = Math.min(
        contentHeightPerPage,
        imgHeightPage2 - imgCurrentY
      );

      pdf.addImage(
        imgDataPage2,
        "PNG",
        padding, // x position in PDF
        currentY, // y position in PDF
        pdfWidth - 2 * padding, // width in PDF
        heightToDraw, // height in PDF
        undefined,
        undefined,
        "FAST", // Compression: FAST, MEDIUM, SLOW
        [
          0,
          imgCurrentY,
          canvasPage2.width,
          heightToDraw * (canvasPage2.width / (pdfWidth - 2 * padding)),
        ] // sx, sy, sWidth, sHeight from source image
      );

      currentY += heightToDraw;
      imgCurrentY += heightToDraw;
    }

    pdf.save(`${record.quotationNumber || "quotation"}.pdf`);
    toast.success("PDF downloaded successfully!", { id: toastId });
  } catch (err) {
    console.error("Failed to generate PDF:", err);
    toast.error("Failed to generate PDF. Please try again.", { id: toastId });
  } finally {
    if (tempDivPage1 && document.body.contains(tempDivPage1)) {
      document.body.removeChild(tempDivPage1);
    }
    if (tempDivPage2 && document.body.contains(tempDivPage2)) {
      document.body.removeChild(tempDivPage2);
    }
  }
};
