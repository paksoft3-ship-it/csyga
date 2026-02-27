import PaymentMethods from "@/components/checkout/PaymentMethods";

export const metadata = {
    title: "Checkout – CSYGA",
};

export default function CheckoutPage() {
    return (
        <section className="min-h-screen bg-[#f6f7f8] pt-20 pb-16">
            <PaymentMethods />
        </section>
    );
}
