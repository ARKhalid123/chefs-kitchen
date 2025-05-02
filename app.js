// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle navbar appearance on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Handle Sign Up Button Click
document.addEventListener('DOMContentLoaded', function() {
    const signUpBtn = document.querySelector('.sign-up-btn');
    const signInBtn = document.querySelector('.sign-in-btn');
    const signUpModal = new bootstrap.Modal(document.getElementById('signUpModal'));
    const signInModal = new bootstrap.Modal(document.getElementById('signInModal'));

    signUpBtn.addEventListener('click', function() {
        signUpModal.show();
    });

    signInBtn.addEventListener('click', function() {
        signInModal.show();
    });

    // Handle form submissions
    const signUpForm = document.querySelector('#signUpModal form');
    const signInForm = document.querySelector('#signInModal form');

    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Sign Up form submitted');
            signUpModal.hide();
        });
    }

    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Sign In form submitted');
            signInModal.hide();
        });
    }
});

// Handle Book Table Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const receiptModal = new bootstrap.Modal(document.getElementById('receiptModal'));
    const bookTableModal = new bootstrap.Modal(document.getElementById('bookTableModal'));
    const printReceiptBtn = document.getElementById('printReceipt');
    const downloadReceiptBtn = document.getElementById('downloadReceipt');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Generate a random table number between 1 and 50
            const tableNumber = Math.floor(Math.random() * 50) + 1;
            
            // Get current date and time
            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Get form values
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                date: this.querySelector('input[type="date"]').value,
                time: this.querySelector('input[type="time"]').value,
                persons: this.querySelector('select').value,
                specialRequests: this.querySelector('textarea').value,
                tableNumber: tableNumber,
                bookingDate: formattedDate
            };

            // Generate receipt content
            const receiptContent = document.getElementById('receiptContent');
            const receiptDetails = receiptContent.querySelector('.receipt-details');
            const tableNumberDiv = receiptContent.querySelector('.table-number');
            const receiptDate = receiptContent.querySelector('.receipt-date');
            
            receiptDate.textContent = `Booking made on ${formattedDate}`;
            
            receiptDetails.innerHTML = `
                <p><span>Name:</span> <span>${formData.name}</span></p>
                <p><span>Email:</span> <span>${formData.email}</span></p>
                <p><span>Phone:</span> <span>${formData.phone}</span></p>
                <p><span>Reservation Date:</span> <span>${formData.date}</span></p>
                <p><span>Reservation Time:</span> <span>${formData.time}</span></p>
                <p><span>Number of Persons:</span> <span>${formData.persons}</span></p>
                ${formData.specialRequests ? `<p><span>Special Requests:</span> <span>${formData.specialRequests}</span></p>` : ''}
            `;
            
            tableNumberDiv.innerHTML = `
                Your Table Number: ${formData.tableNumber}
            `;

            // Close booking modal and show receipt
            bookTableModal.hide();
            setTimeout(() => {
                receiptModal.show();
            }, 500);
        });
    }

    // Handle Print Receipt
    if (printReceiptBtn) {
        printReceiptBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Handle Download PDF
    if (downloadReceiptBtn) {
        downloadReceiptBtn.addEventListener('click', async function() {
            const receiptContent = document.getElementById('receiptContent');
            
            // Create a clone of the receipt content
            const clone = receiptContent.cloneNode(true);
            
            // Style the clone for PDF generation
            clone.style.position = 'fixed';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.margin = '20px';
            clone.style.padding = '20px';
            clone.style.background = 'white';
            clone.style.color = 'black';
            clone.style.borderRadius = '0';
            clone.style.width = '800px';
            clone.style.zIndex = '-9999';
            
            // Apply specific styles for PDF generation
            const styles = `
                <style>
                    .receipt-content {
                        background-color: white !important;
                        color: black !important;
                        padding: 20px !important;
                        font-family: Arial, sans-serif !important;
                    }
                    .receipt-header h3 {
                        color: #DF6853 !important;
                        font-size: 24px !important;
                        margin-bottom: 10px !important;
                    }
                    .receipt-date {
                        color: #666 !important;
                        margin-bottom: 20px !important;
                    }
                    .receipt-details {
                        background-color: #f8f9fa !important;
                        padding: 15px !important;
                        margin-bottom: 20px !important;
                    }
                    .receipt-details p {
                        margin-bottom: 10px !important;
                        display: flex !important;
                        justify-content: space-between !important;
                        color: black !important;
                    }
                    .receipt-details p span:first-child {
                        color: #666 !important;
                        font-weight: bold !important;
                    }
                    .receipt-details p span:last-child {
                        color: black !important;
                        font-weight: normal !important;
                    }
                    .table-number {
                        background-color: #DF6853 !important;
                        color: white !important;
                        padding: 15px !important;
                        text-align: center !important;
                        font-size: 20px !important;
                        font-weight: bold !important;
                        margin: 20px 0 !important;
                        border-radius: 8px !important;
                    }
                    .receipt-footer {
                        text-align: center !important;
                        margin-top: 20px !important;
                        padding-top: 20px !important;
                        border-top: 1px solid #ddd !important;
                    }
                    .receipt-footer p {
                        color: #666 !important;
                        margin-bottom: 5px !important;
                    }
                </style>
            `;
            
            // Create a wrapper div
            const wrapper = document.createElement('div');
            wrapper.innerHTML = styles;
            wrapper.appendChild(clone);
            document.body.appendChild(wrapper);

            try {
                const canvas = await html2canvas(clone, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    logging: false,
                    onclone: function(clonedDoc) {
                        const clonedContent = clonedDoc.querySelector('#receiptContent');
                        if (clonedContent) {
                            clonedContent.style.transform = 'none';
                        }
                    }
                });
                
                const imgData = canvas.toDataURL('image/png');
                
                // Initialize jsPDF
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                
                // Calculate dimensions
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                
                // Add image to PDF
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                
                // Save the PDF
                pdf.save('table-reservation.pdf');
                
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('There was an error generating the PDF. Please try again.');
            } finally {
                // Clean up
                document.body.removeChild(wrapper);
            }
        });
    }
});
