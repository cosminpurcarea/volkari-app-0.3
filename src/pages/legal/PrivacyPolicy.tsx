import React from 'react';
import LegalLayout from '../../components/legal/LegalLayout';

const PrivacyPolicy: React.FC = () => (
  <LegalLayout title="Privacy Policy">
    <div className="prose prose-lg max-w-none">
      <div className="mb-8">
        <p className="text-gray-600">Effective Date: March 19, 2024</p>
        <p className="text-gray-600">Last Updated: March 19, 2024</p>
      </div>

      <p className="mb-6">
        VOLKARI ("we," "our," "us") respects your privacy and is committed to protecting your personal data. 
        This Privacy Policy explains how we collect, use, disclose, and protect your personal information in 
        accordance with applicable data protection laws, including the General Data Protection Regulation (GDPR).
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Personal Identification Information:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Name, email address, and account credentials (email/password).</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Usage Data:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Interaction logs, session data, and learning progress within the application.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Device Information:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>IP address, browser type, operating system, and device information.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
      <p>We collect and use your data for the following purposes:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide, maintain, and improve our services.</li>
        <li>To personalize user experiences, such as displaying relevant exercises.</li>
        <li>To send updates, notifications, and important service-related communications.</li>
        <li>To ensure security and prevent fraud.</li>
        <li>To analyze user progress and provide reporting and statistics.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">3. Legal Basis for Processing</h2>
      <p>We process your personal data on the following legal grounds:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Performance of a Contract: To deliver the services you signed up for.</li>
        <li>Legitimate Interests: To improve the functionality of the application.</li>
        <li>Consent: For activities like email notifications where required by law.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">4. How We Share Your Information</h2>
      <p className="mb-4">We do not sell, rent, or trade your personal information. However, we may share it in the following cases:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>With service providers and partners who help us operate the application (e.g., Supabase for authentication and data storage).</li>
        <li>When required by law, regulation, or legal process.</li>
        <li>In case of a business transaction, such as a merger or acquisition, your data may be transferred.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Retention</h2>
      <p>We retain your personal data only as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. When no longer required, we securely delete or anonymize your data.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
      <p className="mb-4">Under the GDPR, you have the following rights:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Access: Request a copy of your personal data.</li>
        <li>Correction: Update incorrect or incomplete data.</li>
        <li>Deletion: Request the deletion of your personal data.</li>
        <li>Objection: Object to certain types of data processing.</li>
        <li>Data Portability: Request a transfer of your data to another service.</li>
      </ul>
      <p>To exercise these rights, please contact us at contact@volkari.com</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">7. Data Security</h2>
      <p>We use industry-standard measures to protect your data, including encryption, secure servers, and restricted access. However, no system is 100% secure, and we cannot guarantee absolute security.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">8. Cookies and Tracking</h2>
      <p>We use cookies and similar technologies to enhance the user experience and gather usage statistics. You can manage cookie preferences in your browser settings.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">9. Third-Party Services</h2>
      <p className="mb-4">Our application uses third-party services, such as Supabase, for data storage and authentication. These services have their own privacy policies, and we encourage you to review them:</p>
      <p>
        <a 
          href="https://supabase.com/privacy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          Supabase Privacy Policy
        </a>
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">10. International Data Transfers</h2>
      <p>If your data is transferred outside the European Economic Area (EEA), we ensure it is protected under adequate safeguards as required by GDPR.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">11. Children's Privacy</h2>
      <p>Our services are not intended for individuals under 16 years of age. We do not knowingly collect data from children under 16.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">12. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. We encourage you to review it regularly. Changes will be effective when posted on this page.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">13. Contact Us</h2>
      <p>If you have questions or concerns about this Privacy Policy or your personal data, please contact us:</p>
      <ul className="list-none pl-6 mb-4">
        <li>Email: contact@volkari.com</li>
        <li>Address: Göttingen, Germany</li>
      </ul>
    </div>
  </LegalLayout>
);

export default PrivacyPolicy;