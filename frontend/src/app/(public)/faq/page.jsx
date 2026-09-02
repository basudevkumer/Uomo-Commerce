import FaqList from "@/features/faq/components/FaqList";
import faqData from "@/features/faq/data/faqData";

const PAGE_HEADING = "FREQUENTLY ASKED QUESTIONS";

export const metadata = {
  title: "FAQ | Uomo",
  description: "Frequently asked questions",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-232.5 mx-auto px-6 pt-36 lg:pt-40 pb-13 lg:pb-25">
        <h1 className="head_35_bold text-head leading-[100%] mb-12">
          {PAGE_HEADING}
        </h1>
        <FaqList faqs={faqData} />
      </div>
    </div>
  );
}
