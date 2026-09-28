"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#060B14] pt-32 pb-24 selection:bg-[#00D4FF]/30">
      <div className="max-w-[850px] mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-[#1a2436] pb-10"
        >
          <span className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase mb-4 block">
            Legal
          </span>
          <h1 className="font-serif text-[42px] lg:text-[52px] text-white leading-[1.1] tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-[14px]">
            Last updated: September 25, 2026
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6 text-[15px] text-slate-400 leading-[1.8]"
        >
          <p>
            This Privacy Policy explains how <strong className="text-white font-medium">SWIFTIAM</strong> (“we,” “us,” or “our”) collects, uses, shares, and protects information when you use the SWIFTIAM mobile application (including the Android app published on Google Play), related web services, and APIs (together, the “Services”).
          </p>
          <p>
            We wrote this policy in plain language so everyday users can understand it. If you do not agree with this policy, please do not use the Services.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            1. Who we are
          </h2>
          <div className="bg-[#0A1220] border border-[#1a2436] rounded-lg p-6 flex flex-col gap-2 mb-2">
            <p><strong className="text-white font-medium">App name:</strong> SWIFTIAM</p>
            <p><strong className="text-white font-medium">Developer / company:</strong> SWIFTIAM</p>
            <p><strong className="text-white font-medium">Address:</strong> Bole, Addis Ababa, Ethiopia</p>
            <p><strong className="text-white font-medium">Privacy & support email:</strong> <a href="mailto:support@swiftiam.com" className="text-[#00D4FF] hover:underline">support@swiftiam.com</a></p>
          </div>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            2. Account creation
          </h2>
          <p>
            Yes - the SWIFTIAM app and Services generally require an account. Accounts may be created by your employer or carrier (for example, a fleet administrator inviting drivers) or through our registration flows. Account credentials are used to authenticate you and protect access to operational data.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            3. Information we collect
          </h2>
          <p>We collect information in the following categories.</p>

          <h3 className="text-white text-[18px] font-bold mt-4 mb-2">3.1 Personal data</h3>
          <ul className="list-disc list-outside ml-6 flex flex-col gap-3 mb-4">
            <li><strong className="text-white font-medium">Account and contact information:</strong> name, email address, phone number, and account credentials (such as passwords or authentication tokens).</li>
            <li><strong className="text-white font-medium">Location / GPS data:</strong> approximate or precise location while you are driving or on duty, when location permissions are enabled, to support dispatch, ETA, route, and fleet operations.</li>
            <li><strong className="text-white font-medium">Photos and documents:</strong> images and files you capture or upload in the app, such as bills of lading (BOL), fuel receipts, checkpoint scans, and similar operational documents.</li>
            <li><strong className="text-white font-medium">Device information:</strong> device identifiers, operating system version, app version, and related device/technical details needed to run and secure the app.</li>
          </ul>

          <h3 className="text-white text-[18px] font-bold mt-6 mb-2">3.2 Non-personal / technical data</h3>
          <ul className="list-disc list-outside ml-6 flex flex-col gap-3 mb-4">
            <li><strong className="text-white font-medium">Crash and diagnostic logs:</strong> information about app crashes and errors (via Sentry) to find and fix bugs.</li>
            <li><strong className="text-white font-medium">Usage and operational diagnostics:</strong> limited technical events needed to operate, monitor, and improve reliability of the Services (for example, whether a feature loaded successfully).</li>
          </ul>

          <h3 className="text-white text-[18px] font-bold mt-6 mb-2">3.3 Information we do not sell for advertising</h3>
          <p>
            SWIFTIAM does not sell your personal information and does not use third-party advertising networks (such as AdMob) to show ads in the app based on your data.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            4. How and why we use your data
          </h2>
          <p>We use collected information to:</p>
          <ul className="list-disc list-outside ml-6 flex flex-col gap-3 mb-4">
            <li>Create and manage your account and authenticate access to the Services.</li>
            <li>Provide core transportation features: load/status updates, dispatch coordination, location-based fleet visibility while on duty, document capture, and related workflows.</li>
            <li>Send in-app and push notifications (via Expo) about loads, assignments, and service alerts.</li>
            <li>Process payments and billing where applicable (via Stripe).</li>
            <li>Map and location-related features (via Mapbox and device location services).</li>
            <li>Host, store, and process data securely on our infrastructure (via AWS).</li>
            <li>Monitor crashes, diagnose issues, and improve app stability (via Sentry).</li>
            <li>Comply with law, enforce our terms, and protect the security of users and the Services.</li>
            <li>Respond to support requests you send to us.</li>
          </ul>
          <p>
            We process personal data because it is necessary to provide the Services you (or your employer) request, to meet legitimate operational and security interests, and where required, to comply with legal obligations. Where location or camera access is optional at the OS level, we rely on the permissions you grant on your device.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            5. Location data
          </h2>
          <p>
            If you (or your fleet administrator's configuration) enable location permissions, SWIFTIAM may collect location / GPS data while you are driving or on duty so dispatchers and authorized company users can coordinate loads, ETAs, and safety/operations workflows.
          </p>
          <p>
            You can control location permissions in your device settings. Disabling location may limit features that depend on live positioning. Location is not used to sell advertising.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            6. Photos and documents
          </h2>
          <p>
            When you take or upload photos and documents (for example BOL, receipts, or checkpoint scans), those files are transmitted to our Services so your company can complete deliveries, compliance, and settlement workflows. Treat these uploads as business records belonging to your carrier or employer relationship as well as data we process as a service provider.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            7. How we share information
          </h2>
          <p>We may share information with:</p>
          <ul className="list-disc list-outside ml-6 flex flex-col gap-3 mb-4">
            <li><strong className="text-white font-medium">Your organization:</strong> fleet owners, brokers, dispatchers, and other authorized users in your company workspace who need the data to run operations.</li>
            <li><strong className="text-white font-medium">Service providers (processors):</strong> that help us run the app, under contractual obligations to protect your data:
              <ul className="list-circle list-outside ml-6 mt-2 flex flex-col gap-2 text-[14px]">
                <li>Amazon Web Services (AWS) - cloud hosting, storage, and related infrastructure.</li>
                <li>Stripe - payment processing and billing where payments apply.</li>
                <li>Sentry - crash reporting and error diagnostics.</li>
                <li>Mapbox - maps and location-related mapping services.</li>
                <li>Expo - in-app push notification delivery for the mobile app.</li>
              </ul>
            </li>
            <li><strong className="text-white font-medium">Legal and safety:</strong> when required by law, legal process, or to protect rights, safety, and security.</li>
            <li><strong className="text-white font-medium">Business transfers:</strong> if we are involved in a merger, acquisition, or sale of assets, information may transfer as part of that transaction, subject to this policy or equivalent protections.</li>
          </ul>
          <p>We do not sell personal information to data brokers.</p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            8. Data retention and deletion
          </h2>
          <p>
            We retain personal data only as long as needed to provide the Services, meet legal and accounting obligations, resolve disputes, and enforce our agreements. Retention periods can vary by data type (for example, operational documents and trip records may be kept longer because carriers often need them for compliance and settlement).
          </p>

          <h3 className="text-white text-[18px] font-bold mt-6 mb-2">8.1 How to request deletion of your data and account</h3>
          <p>
            Google Play requires that we tell you how to request deletion of your account and associated personal data. The secure way to start a deletion request is:
          </p>
          
          <div className="my-4">
            <Link href="/delete-account" className="inline-block bg-[#1a2436]/40 hover:bg-[#1a2436]/80 text-red-500 border border-red-500/20 px-6 py-3 rounded-lg font-medium transition-colors">
              Delete your SWIFTIAM account
            </Link>
          </div>

          <p>
            That link opens the SWIFTIAM application deletion flow (email verification, status, and cancellation). You can also email: <a href="mailto:support@swiftiam.com" className="text-[#00D4FF] hover:underline">support@swiftiam.com</a>
          </p>
          
          <p>If you email us, please include:</p>
          <ul className="list-disc list-outside ml-6 flex flex-col gap-2 mb-4">
            <li>The email address or phone number associated with your SWIFTIAM account</li>
            <li>Your full name</li>
            <li>A clear request to delete your account and/or personal data</li>
            <li>Your company / fleet name (if applicable)</li>
          </ul>

          <p>
            We will verify your identity and process valid requests within a reasonable period (typically within 30 days, unless a longer period is required by law or needed to complete pending operational, legal, or financial obligations).
          </p>
          
          <div className="bg-[#101D30] border-l-4 border-[#00D4FF] p-5 my-4 rounded-r-lg">
            <p className="m-0"><strong className="text-white">Important:</strong> If your account was created by an employer or carrier, some records may be controlled by that organization. In those cases we may need to coordinate with your company administrator, and certain business records may be retained by your organization even after your personal account access is removed.</p>
          </div>

          <p>
            We may retain limited information as required by law (for example fraud prevention, tax, or dispute records) or in anonymized / aggregated form that no longer identifies you.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            9. How we secure your data
          </h2>
          <p>We use administrative, technical, and organizational measures designed to protect personal data, including:</p>
          <ul className="list-disc list-outside ml-6 flex flex-col gap-3 mb-4">
            <li>Encrypted connections (HTTPS/TLS) for data in transit where the Services are accessed over the internet</li>
            <li>Access controls and authentication for accounts and administrative systems</li>
            <li>Hosting on reputable cloud infrastructure (AWS) with industry-standard security practices</li>
            <li>Monitoring for errors and suspicious activity to help maintain service integrity</li>
          </ul>
          <p>
            No method of transmission or storage is 100% secure. If you believe your account has been compromised, contact us immediately at <a href="mailto:support@swiftiam.com" className="text-[#00D4FF] hover:underline">support@swiftiam.com</a>.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            10. Children's privacy
          </h2>
          <p>
            The Services are built for commercial transportation professionals and are not directed to children under 13 (or under 16 where applicable). We do not knowingly collect personal information from children. If you believe a child has provided us personal data, contact support@swiftiam.com and we will take appropriate steps to delete it.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            11. Your choices and rights
          </h2>
          <p>
            Depending on where you live, you may have rights to access, correct, export, or delete personal data, or to object to certain processing. To exercise these rights, email <a href="mailto:support@swiftiam.com" className="text-[#00D4FF] hover:underline">support@swiftiam.com</a>. You can also manage device permissions (location, camera, notifications) in your phone settings, and uninstall the app at any time.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            12. International processing
          </h2>
          <p>
            We are based in Ethiopia. If you use the Services from another country, your information may be processed in Ethiopia and other locations where we or our service providers operate. Those locations may have different data protection laws than your home country.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            13. Changes to this policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the updated version on this page and revise the “Last updated” date. Material changes may also be communicated through the app or by email when appropriate. Continued use of the Services after an update means you acknowledge the revised policy.
          </p>

          <h2 className="font-serif text-[26px] text-white mt-10 mb-2 border-b border-[#1a2436] pb-4">
            14. Contact us
          </h2>
          <p>Questions about this Privacy Policy, your data, or deletion requests:</p>
          
          <div className="bg-[#0A1220] border border-[#1a2436] rounded-lg p-6 mt-4 mb-8">
            <p className="font-medium text-white mb-2">SWIFTIAM</p>
            <p>Bole, Addis Ababa, Ethiopia</p>
            <p className="mt-2">Email: <a href="mailto:support@swiftiam.com" className="text-[#00D4FF] hover:underline">support@swiftiam.com</a></p>
            <p>Phone: +251 900 000 000</p>
          </div>

          <hr className="border-[#1a2436] my-8" />
          
          <p className="text-[13px] text-slate-500 text-center mb-10">
            This page is the public Privacy Policy for the SWIFTIAM mobile app on Google Play and related Services. For product questions, return to the <Link href="/" className="text-[#00D4FF] hover:underline">homepage</Link>.
          </p>

        </motion.div>
      </div>
    </div>
  );
}