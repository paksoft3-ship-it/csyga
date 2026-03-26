const nodemailer = require("nodemailer");

async function test() {
    const transporter = nodemailer.createTransport({ streamTransport: true });

    try {
        await transporter.sendMail({
            from: "test@test.com",
            to: ["Thecsyga@gmail.com", "info@csyga.org"],
            subject: "Admin test",
            text: "Hello",
        });
        console.log("Admin email passed");

        const testEmails = ["", " ", "invalid", [], [" "]];
        for (const email of testEmails) {
            try {
                if (email) {
                    await transporter.sendMail({
                        from: "test@test.com",
                        to: email,
                        subject: "Applicant test",
                        text: "Hello",
                    });
                    console.log(`Email \`${JSON.stringify(email)}\` passed!`);
                } else {
                    console.log(`Email \`${JSON.stringify(email)}\` skipped because if(email) is false.`);
                }
            } catch (err) {
                console.log(`Email \`${JSON.stringify(email)}\` FAILED: ${err.message}`);
            }
        }
    } catch (e) {
        console.error("Global error:", e.message);
    }
}

test();
