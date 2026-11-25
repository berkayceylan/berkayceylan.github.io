import os
from pypdf import PdfReader
from pdf2image import convert_from_path

def convert_pdf_to_jpg(pdf_path, output_path):
    # Read the pdf file
    pdf = PdfReader(open(pdf_path, 'rb'))

    # Get the number of pages
    num_pages = len(pdf.pages)

    # Convert each page to jpg image
    for i in range(num_pages):
        images = convert_from_path(pdf_path, first_page=i+1, last_page=i+2)
        for image in images:
            image.save(os.path.join(output_path,str(i) + '.jpg'), 'JPEG')

# Test the function
convert_pdf_to_jpg('./book.pdf', './data')
