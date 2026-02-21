import PageHeader from "@/components/ui/PageHeader";
import OpportunityCards from "@/components/getInvolved/OpportunityCards";
import MentorForm from "@/components/getInvolved/MentorForm";
import data from "@/data/getInvolved.json";

export default function GetInvolvedPage() {
    const { header } = data.getInvolved;

    return (
        <>
            <PageHeader
                title={header.title}
                description={header.description}
                bgImage={header.bgImage}
            />
            <OpportunityCards />
            <MentorForm />
        </>
    );
}
