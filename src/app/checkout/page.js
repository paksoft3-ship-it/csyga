import PageHeader from "@/components/ui/PageHeader";
import PaymentMethods from "@/components/checkout/PaymentMethods";

export default function CheckoutPage() {
    return (
        <>
            <PageHeader
                title="Secure Checkout"
                description="Complete your application"
                bgImage="/images/2.jpg"
            />
            <section className="py-16 bg-white min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <PaymentMethods />
                </div>
            </section>
        </>
    );
}
