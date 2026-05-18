import PDFDocument from "pdfkit";

const generateInvoice = (res,order)=>{
  const doc = new PDFDocument({margin:50 });
  res.setHeader("Content-Type", "application/pdf");

  res.setHeader("Content-Disposition",`inline; filename=invoice-${order._id}.pdf` );
  doc.pipe(res);

  doc
    .fontSize(28)
    .font("Helvetica-Bold")
    .text("Vintage Styles", {align: "center" });

  doc.moveDown();

  doc
    .fontSize(20)
    .text("INVOICE", {align: "center"});

  doc.moveDown(2);

  // ORDER DETAILS
  doc
    .fontSize(13)
    .font("Helvetica");

  doc.text(`Order ID: ${order._id}`);

  doc.text(`Date: ${new Date(order.date).toLocaleString()}` );

  doc.text(`Order Status: ${order.status}`);

  doc.text(`Payment Method: ${order.paymentMethod}`);

  doc.text(`Payment Status: ${order.payment ? "Paid" : "Pending"}`);

  doc.moveDown();

  // CUSTOMER DETAILS
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("Customer Details");

  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .font("Helvetica");

  doc.text(`Name: ${order.address.firstName} ${order.address.lastName}`);

  doc.text(`Phone: ${order.address.phone}`);

  doc.text(`Address: ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country} - ${order.address.zipcode}`);

  doc.moveDown();

  // DELIVERY PARTNER DETAILS
  if (order.assignedPartner){
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("Delivery Partner Details");

    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .font("Helvetica");

    doc.text(`Company Name: ${order.assignedPartner.companyName}`);

    doc.text(`Partner ID: ${order.assignedPartner.partnerId}`);

    doc.text(`Phone: ${order.assignedPartner.phone}`);

    doc.text(`Delivery Charges: ₹${order.assignedPartner.charges}`);

    doc.moveDown();
  }

  // PRODUCTS TABLE
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("Ordered Products");

  doc.moveDown();

  doc
    .fontSize(12)
    .font("Helvetica-Bold");

  doc.text("Product", 50);
  doc.text("Size", 260);
  doc.text("Qty", 330);
  doc.text("Price", 390);
  doc.text("Total", 470);

  doc.moveDown();

  let calculatedTotal = 0;
  order.items.forEach((item) => {
    const total=item.price * item.quantity;
    calculatedTotal += total;

    doc
      .fontSize(11)
      .font("Helvetica");

    doc.text(item.name, 50);

    doc.text(item.size || "N/A",260);

    doc.text(item.quantity.toString(),330);

    doc.text(`₹${item.price}`,390);

    doc.text(`₹${total}`,470);

    doc.moveDown();
  });

  // GRAND TOTAL
  doc.moveDown();

  doc
    .fontSize(17)
    .font("Helvetica-Bold")
    .text(`Grand Total: ₹${order.amount}`,{align: "right"});

  doc.moveDown(2);

  doc
    .fontSize(12)
    .font("Helvetica")
    .text("Thank you for shopping with Vintage Styles.Have a great day!",{align: "center"});

  doc.end();
};

export default generateInvoice;