import React from 'react';
import LegalLayout from '../../components/legal/LegalLayout';

const CookiePolicy: React.FC = () => (
  <LegalLayout title="Cookie Policy">
    <div className="prose prose-lg max-w-none">
      <div className="mb-8">
        <p className="text-gray-600">Effective Date: March 19, 2024</p>
        <p className="text-gray-600">Last Updated: March 19, 2024</p>
      </div>

      <p className="mb-6">
        This Cookie Policy explains how VOLKARI ("we," "our," "us") uses cookies and similar 
        technologies to enhance your experience on our platform. By using our website or 
        application, you agree to the use of cookies as described in this policy.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device (computer, tablet, or smartphone) 
        when you visit a website or use an application. Cookies help us recognize your device, 
        store your preferences, and improve your overall user experience.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">2. Types of Cookies We Use</h2>
      <p>We use the following types of cookies on our platform:</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Essential Cookies</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>These cookies are necessary for the operation of our application, such as authentication and security-related functions.</li>
        <li>Example: Cookies used by Supabase for session management.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Performance and Analytics Cookies</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>These cookies help us understand how you use our services, allowing us to improve functionality and performance.</li>
        <li>Example: Cookies tracking user interactions, session durations, and application usage patterns.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Functional Cookies</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>These cookies enable us to provide enhanced features and personalization, such as remembering your language preferences.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">3. Third-Party Cookies</h2>
      <p className="mb-4">
        We may use third-party services, such as Supabase, for authentication, data storage, 
        and session management. These services may set cookies on your device. We encourage 
        you to review their cookie and privacy policies:
      </p>
      <p className="mb-4">
        <a 
          href="https://supabase.com/privacy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          Supabase Privacy Policy
        </a>
      </p>
      <p>Additionally, we may integrate analytics tools to help us understand user behavior.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">4. Why We Use Cookies</h2>
      <p>We use cookies for the following purposes:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Authentication: To log you into your account securely and maintain your session.</li>
        <li>Personalization: To remember your preferences and improve your experience.</li>
        <li>Analytics: To analyze how users interact with our platform and improve functionality.</li>
        <li>Security: To detect and prevent fraudulent or malicious activities.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">5. Managing Cookies</h2>
      <p>You can manage your cookie preferences in the following ways:</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Browser Settings:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Most web browsers allow you to control cookies through their settings. You can block or delete cookies by adjusting your browser preferences.</li>
        <li>Refer to your browser's help documentation for instructions.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Opt-Out Links:</h3>
      <p className="mb-4">
        Some third-party providers offer opt-out mechanisms. For example, you can opt out of 
        analytics tracking by using your browser's privacy settings or built-in privacy features.
      </p>

      <p className="mb-4">
        Please note that disabling cookies may affect the functionality of our services.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">6. Retention Periods</h2>
      <p>We retain cookies for different periods depending on their purpose:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Session Cookies: Deleted when you close your browser.</li>
        <li>Persistent Cookies: Stored on your device for a defined period or until manually deleted.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">7. Updates to This Cookie Policy</h2>
      <p>
        We may update this Cookie Policy to reflect changes in our practices or applicable laws. 
        We encourage you to review it regularly. Changes will be effective when posted on this page.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
      <p>If you have questions or concerns about this Cookie Policy, please contact us:</p>
      <ul className="list-none pl-6 mb-4">
        <li>Email: contact@volkari.com</li>
        <li>Address: Göttingen, Germany</li>
      </ul>
    </div>
  </LegalLayout>
);

export default CookiePolicy;