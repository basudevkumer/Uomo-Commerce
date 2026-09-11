import FaqList from "@/features/faq/components/FaqList";
import faqData from "@/features/faq/data/faqData";
import Container from "@/components/common/Container";

const PAGE_HEADING = "FREQUENTLY ASKED QUESTIONS";

export const metadata = {
  title: "FAQ | Uomo",
  description: "Frequently asked questions",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      <Container>
        <div className="max-w-232.5 mx-auto mt-[96px] mb-[50px]">
          <h1 className="head_35_bold text-head leading-[100%] mb-12">
            {PAGE_HEADING}
          </h1>
          <FaqList faqs={faqData} />
        </div>
      </Container>
    </div>
  );
}
