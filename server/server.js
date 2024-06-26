const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const ejs = require('ejs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to enable Cross-Origin Resource Sharing
app.use(cors());

/**
 * Convert a numeric amount into words.
 * @param {number} amount - The amount to convert.
 * @returns {string} - The amount in words.
 */
function convertAmountToWords(amount) {
    const words = [
        'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const tens = ['Zero', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Million', 'Billion'];

    if (amount === 0) {
        return 'Zero Only';
    }

    let wordsArray = [];
    let numString = amount.toString();
    let scale = 0;

    while (numString.length > 0) {
        let chunk = parseInt(numString.slice(-3), 10);
        numString = numString.slice(0, -3);

        if (chunk) {
            let chunkWords = [];
            if (chunk > 99) {
                chunkWords.push(words[Math.floor(chunk / 100)]);
                chunkWords.push('Hundred');
                chunk %= 100;
            }

            if (chunk > 19) {
                chunkWords.push(tens[Math.floor(chunk / 10)]);
                chunk %= 10;
            }

            if (chunk > 0) {
                chunkWords.push(words[chunk]);
            }

            if (scales[scale]) {
                chunkWords.push(scales[scale]);
            }
            wordsArray = chunkWords.concat(wordsArray);
        }
        scale++;
    }

    return wordsArray.join(' ') + ' Only';
}

// Endpoint to generate an invoice
app.post('/generate-invoice', (req, res) => {
    const data = req.body;

    // Calculate net amount, tax amounts, and total amount for each item
    data.items.forEach(item => {
        item.netAmount = (item.unitPrice * item.quantity) - item.discount;
        item.taxRate = 18; // Example tax rate of 18%

        if (data.placeOfSupply === data.placeOfDelivery) {
            // Apply CGST and SGST if place of supply and place of delivery are the same
            item.taxType = 'CGST/SGST';
            item.cgst = item.netAmount * (item.taxRate / 2) / 100;
            item.sgst = item.netAmount * (item.taxRate / 2) / 100;
            item.igst = 0;
        } else {
            // Apply IGST if place of supply and place of delivery are different
            item.taxType = 'IGST';
            item.cgst = 0;
            item.sgst = 0;
            item.igst = item.netAmount * item.taxRate / 100;
        }

        item.taxAmount = item.cgst + item.sgst + item.igst;
    });

    // Calculate total amount and amount in words
    data.totalAmount = data.items.reduce((sum, item) => sum + item.netAmount + item.taxAmount, 0);
    data.amountInWords = convertAmountToWords(data.totalAmount);

    // Render the invoice template with provided data
    ejs.renderFile(path.join(__dirname, 'templates', 'invoice.ejs'), { data }, (err, html) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const options = { format: 'A4' };
        // Generate PDF from HTML and send it as response
        pdf.create(html, options).toBuffer((err, buffer) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.setHeader('Content-Type', 'application/pdf');
            res.send(buffer);
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
