# Re-import library due to code environment reset
from fpdf import FPDF

# Redefine PDF class
class PDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 12)
        self.cell(0, 10, "Leng Technologies - IT Diagnostic Service Policy", ln=True, align="C")
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

    def chapter_title(self, title):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(0)
        self.cell(0, 10, title, ln=True)
        self.ln(1)

    def chapter_body(self, body):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(0)
        self.multi_cell(0, 8, body)
        self.ln()

# Personalized content for Leng Technologies - IT Services
personalized_policy_sections = [
    ("1. Service Call and Diagnostic Fee",
     "At Leng Technologies, a standard diagnostic fee is charged for the time, expertise, ",
     "and tools used during the inspection - regardless of whether a definitive diagnosis is reached.\n\n"
     "This fee covers:\n"
     "- On-site or remote inspection and evaluation\n"
     "- Testing and ruling out common IT-related issues\n"
     "- Documentation of findings and professional recommendations"),

    ("2. Undiagnosed Issues",
     "In the event that a diagnosis cannot be confirmed during the initial session, we will:\n"
     "- Provide a written summary of the IT diagnostics performed\n"
     "- Note all findings and tests completed\n"
     "- Recommend appropriate next steps, which may include further diagnostics, observation, or referral to a specialist\n\n"
     "Our goal is always to narrow down the issue, helping reduce downtime and future troubleshooting costs."),

    ("3. Credit Toward Repair or Continued Service",
     "If you choose to proceed with a repair or service through Leng Technologies based on our findings, ",
     "we will credit the diagnostic fee toward the final service cost (if within 30 days of the diagnostic session)."),

    ("4. Transparent Communication",
     "Before any work begins, you will receive a clear explanation of the process, expected outcomes, ",
     "and associated costs. We believe that honesty, integrity, and clarity are the foundation of reliable IT service.")
]

# Create PDF
pdf = PDF()
pdf.add_page()

for title, body in personalized_policy_sections:
    pdf.chapter_title(title)
    pdf.chapter_body(body)

# Save the PDF
personalized_pdf_path = "./LengTechnologiesServiceAgreement.pdf"
pdf.output(personalized_pdf_path)

personalized_pdf_path
