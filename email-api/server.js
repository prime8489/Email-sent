import express from "express";
import fetch from "node-fetch";

const app = express();

// Send withdrawal email
app.get("/sendMail", async (req, res) => {
  const { email, name } = req.query;

  if (!email || !name) {
    return res.status(400).json({ success: false, message: "Missing email or name" });
  }

  try {
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_f5fi4me",         // Your Service ID
        template_id: "__ejs-test-mail-service__", // Your Template ID
        user_id: "TCelJeiYkh_jaARvW",         // Your Public Key
        template_params: {
          to_email: email,
          to_name: name,
          message: `Hey ${name}! You just withdrew your Otts Rewards from Codiess of Recodex 🎉`
        }
      })
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Render prefers listening on PORT env
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
