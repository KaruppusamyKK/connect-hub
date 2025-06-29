package org.BackEndApp.features.Auth.service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.BackEndApp.features.Auth.utilities.HtmlTemplates;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    @Value("${spring.mail.username}")
    private String fromMail;

    private final JavaMailSender mailSender;


    public void mailTemplate(String email, int otp) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromMail);
        helper.setTo(email);
        helper.setSubject("Your One-Time Password (OTP) for Verification");
        helper.setText(HtmlTemplates.getSignupHtmlTemplate(otp), true);
        mailSender.send(message);
    }




}
