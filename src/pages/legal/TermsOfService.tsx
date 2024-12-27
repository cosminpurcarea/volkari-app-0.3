import React from 'react';
import LegalLayout from '../../components/legal/LegalLayout';

const TermsOfService: React.FC = () => (
  <LegalLayout title="Terms of Service">
    <div className="prose prose-lg max-w-none">
      <div className="mb-8">
        <p className="text-gray-600">Effective Date: March 19, 2024</p>
        <p className="text-gray-600">Last Updated: March 19, 2024</p>
      </div>

      <p className="mb-6">
        Welcome to VOLKARI! By accessing or using our services, you agree to comply with and be bound 
        by these Terms of Service ("Terms"). Please read them carefully. If you do not agree to these 
        Terms, you may not use our services.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
      <p>
        These Terms govern your use of VOLKARI ("we," "our," "us") and any associated services, 
        content, and features. By using our application, you acknowledge that you have read, 
        understood, and agree to be bound by these Terms and our Privacy Policy.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">2. Eligibility</h2>
      <p>To use our services, you must:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Be at least 16 years old or the legal age in your jurisdiction.</li>
        <li>Provide accurate, complete, and up-to-date information during account registration.</li>
        <li>Comply with these Terms and applicable laws and regulations.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">3. User Accounts</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You are responsible for maintaining the confidentiality of your account credentials and for any activities performed under your account.</li>
        <li>Notify us immediately at contact@volkari.com if you suspect unauthorized access to your account.</li>
        <li>We reserve the right to suspend or terminate accounts for violations of these Terms.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">4. Use of Services</h2>
      <p>Our application is designed for personal, non-commercial use only.</p>
      <p>You agree not to misuse our services, including but not limited to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Engaging in unauthorized access, tampering, or hacking.</li>
        <li>Distributing harmful software or content.</li>
        <li>Using our services for illegal activities.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Services</h2>
      <p className="mb-4">
        We rely on third-party services, such as Supabase, for authentication, data storage, and 
        backend functionality. By using our application, you acknowledge and accept Supabase's Terms 
        of Service and Privacy Policy, available at:
      </p>
      <ul className="list-none pl-6 mb-4">
        <li>
          <a 
            href="https://supabase.com/terms" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Supabase Terms of Service
          </a>
        </li>
        <li>
          <a 
            href="https://supabase.com/privacy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Supabase Privacy Policy
          </a>
        </li>
      </ul>
      <p>We are not responsible for third-party services' actions or omissions.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">6. Intellectual Property</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>All content, features, and functionality of the application, including text, graphics, logos, and software, are owned by VOLKARI or our licensors and are protected by copyright, trademark, and other intellectual property laws.</li>
        <li>You may not reproduce, distribute, modify, or create derivative works from our content without prior written permission.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">7. Fees and Payments</h2>
      <p>
        Certain features may require payment of fees. Fees are non-refundable except as required by law.
        You are responsible for all applicable taxes and charges associated with your use of our services.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">8. Termination</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>We reserve the right to suspend or terminate your account or access to our services at any time, with or without notice, for violations of these Terms or other legitimate reasons.</li>
        <li>You may terminate your account at any time by contacting us at contact@volkari.com.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, VOLKARI and its affiliates will not be liable for:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Indirect, incidental, special, consequential, or punitive damages arising from your use of the services.</li>
        <li>Loss of data, revenue, profits, or business opportunities.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">10. Disclaimer of Warranties</h2>
      <p>Our services are provided "as is" and "as available," without warranties of any kind, either express or implied, including but not limited to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement.</li>
        <li>We do not guarantee uninterrupted or error-free operation of the services.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to These Terms</h2>
      <p>
        We reserve the right to update or modify these Terms at any time. Changes will be effective 
        upon posting on our website or application. Continued use of the services constitutes 
        acceptance of the updated Terms.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">12. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the European Union 
        and Germany, without regard to its conflict of law principles.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">13. Dispute Resolution</h2>
      <p>
        Any disputes arising from these Terms or your use of the services will be resolved through 
        negotiation. If unresolved, disputes will be submitted to binding arbitration in accordance 
        with German arbitration law.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">14. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at:</p>
      <ul className="list-none pl-6 mb-4">
        <li>Email: contact@volkari.com</li>
        <li>Address: Göttingen, Germany</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">15. Entire Agreement</h2>
      <p>
        These Terms, together with our Privacy Policy, constitute the entire agreement between you 
        and VOLKARI regarding the use of our services and supersede any prior agreements.
      </p>
    </div>
  </LegalLayout>
);

export default TermsOfService;