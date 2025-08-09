document.getElementById('extractTextBtn').addEventListener('click', () => handleAction('extract-text'));
document.getElementById('mergePdfBtn').addEventListener('click', () => handleAction('merge-pdfs'));
document.getElementById('compressPdfBtn').addEventListener('click', () => handleAction('compress-pdf'));

async function handleAction(action) {
    const pdfInput = document.getElementById('pdfInput').files;
    if (!pdfInput.length) {
        alert('Please select a PDF file');
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < pdfInput.length; i++) {
        formData.append('pdf', pdfInput[i]);
    }

    try {
        const response = await fetch(`http://localhost:3000/${action}`, {
            method: 'POST',
            body: formData
        });
        
        const outputDiv = document.getElementById('output');

        if (action === 'extract-text') {
            const result = await response.json();
            outputDiv.innerText = 'Extracted Text: ' + result.text;
        } else if (action === 'merge-pdfs') {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'merged.pdf';
            link.click();
            outputDiv.innerText = 'PDFs Merged and Downloaded!';
        } else if (action === 'compress-pdf') {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'compressed.pdf';
            link.click();
            outputDiv.innerText = 'PDF Compressed and Downloaded!';
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while processing the PDF');
    }
}
