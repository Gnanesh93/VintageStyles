import PDFDocument from "pdfkit";

const generateInvoice=(res,order)=>{
  const doc=new PDFDocument({margin:40,size:"A4"});
  res.setHeader("Content-Type","application/pdf");
  res.setHeader("Content-Disposition",`inline; filename=invoice-${order._id}.pdf`);
  doc.pipe(res);
  const primaryColor="#111111";
  const lightGray="#F3F4F6";

  doc
    .rect(30,30,550,760)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor(primaryColor)
    .text("Vintage Styles",45,45);

  doc
    .font("Helvetica")
    .fontSize(10)
    .text("Fashion that defines your style",47,72);

  doc
    .rect(410,40,140,30)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .text("TAX INVOICE",435,50);

  doc
    .moveTo(30,95)
    .lineTo(580,95)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("Order Details",45,110);

  doc
    .font("Helvetica")
    .fontSize(10);

  doc.text(`Order ID: ${order._id}`,45,135);

  doc.text(`Order Date: ${new Date(order.date).toLocaleDateString()}`,45,155);

  doc.text(`Invoice Date: ${new Date(order.date).toLocaleDateString()}`,45,175);

  doc.text(`Payment: ${order.payment ? "Paid" : "Pending"}`,45,195);

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("Billing Address",240,110);

  doc
    .font("Helvetica")
    .fontSize(10);

  doc.text(`${order.address.firstName} ${order.address.lastName}`,240,135);

  doc.text(`${order.address.street}`,240,155,{width:140});

  doc.text(`${order.address.city}, ${order.address.state}`,240,185);

  doc.text(`${order.address.country} - ${order.address.zipcode}`,240,205);

  doc.text(`Phone: ${order.address.phone}`,240,225);

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("Shipping Address",420,110);

  doc
    .font("Helvetica")
    .fontSize(10);

  doc.text(`${order.address.firstName} ${order.address.lastName}`, 420,135,{width:120});

  doc.text(`${order.address.street}`,420,155,{width:120});

  doc.text(`${order.address.city}, ${order.address.state}`,420,185,{width:120});

  doc.text(`${order.address.country} - ${order.address.zipcode}`,420,215,{width:120});

  if(order.assignedPartner){
    doc
      .moveTo(30,270)
      .lineTo(580,270)
      .stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Delivery Partner",45,285);

    doc
      .font("Helvetica")
      .fontSize(10);

    doc.text(`Company: ${order.assignedPartner.companyName}`,45,310);

    doc.text(`Partner ID: ${order.assignedPartner.partnerId}`,250,310);

    doc.text(`Phone: ${order.assignedPartner.phone}`,430,310);
  }


  const tableTop=360;
  doc
    .rect(30,tableTop,550,28)
    .fillAndStroke(lightGray,primaryColor);

  doc
    .fillColor(primaryColor)
    .font("Helvetica-Bold")
    .fontSize(11);

  doc.text("Product",45,369);
  doc.text("Size",320,369);
  doc.text("Qty",390,369);
  doc.text("Price",450,369);
  doc.text("Total",520,369);

  let y=400;

  order.items.forEach((item)=>{
    const total=item.price * item.quantity;
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(primaryColor);

    doc.text(item.name,45,y,{width:240});

    doc.text(item.size || "N/A",320,y);

    doc.text(item.quantity.toString(),390,y);

    doc.text(`₹${item.price}`,450,y);

    doc.text(`₹${total}`,520,y);

    doc
      .moveTo(30,y + 25)
      .lineTo(580,y + 25)
      .strokeColor("#DDDDDD")
      .stroke();
    y += 35;
  });

  doc
    .rect(380,y + 20,200,55)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(17)
    .fillColor(primaryColor);

  doc.text("Grand Total",400,y + 38);

  doc.text(`₹ ${order.amount}`,505,y + 38);

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("gray")
    .text("This is a computer generated invoice. No signature required.",150,760);

  doc.end();
};

export default generateInvoice;