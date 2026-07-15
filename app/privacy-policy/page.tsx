import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${SITE_NAME} — how and why we access, collect, store, use, and share personal information.`,
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Privacy policy for ${SITE_NAME} — how and why we access, collect, store, use, and share personal information.`,
    url: '/privacy-policy',
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finance Beacon — Free Finance Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
}

const DSAR_URL =
  'https://app.termly.io/dsar/48c4e70c-56ac-4706-ac29-5f755737805a'

const h2 = 'mt-10 scroll-mt-24 text-2xl font-semibold text-navy'
const h3 = 'mt-6 text-lg font-semibold text-navy'
const p = 'mt-3 leading-relaxed text-muted'
const ul = 'mt-3 list-disc space-y-2 pl-6 text-muted'
const link = 'text-accent underline'

const CATEGORIES: { label: string; examples: string }[] = [
  {
    label: 'A. Identifiers',
    examples:
      'Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name',
  },
  {
    label: 'B. Personal information as defined in the California Customer Records statute',
    examples:
      'Name, contact information, education, employment, employment history, and financial information',
  },
  {
    label: 'C. Protected classification characteristics under state or federal law',
    examples:
      'Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data',
  },
  {
    label: 'D. Commercial information',
    examples:
      'Transaction information, purchase history, financial details, and payment information',
  },
  { label: 'E. Biometric information', examples: 'Fingerprints and voiceprints' },
  {
    label: 'F. Internet or other similar network activity',
    examples:
      'Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements',
  },
  { label: 'G. Geolocation data', examples: 'Device location' },
  {
    label: 'H. Audio, electronic, sensory, or similar information',
    examples:
      'Images and audio, video or call recordings created in connection with our business activities',
  },
  {
    label: 'I. Professional or employment-related information',
    examples:
      'Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us',
  },
  {
    label: 'J. Education Information',
    examples: 'Student records and directory information',
  },
  {
    label: 'K. Inferences drawn from collected personal information',
    examples:
      'Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual&rsquo;s preferences and characteristics',
  },
  { label: 'L. Sensitive personal Information', examples: '—' },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-navy">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated July 15, 2026</p>

      <p className={p}>
        This Privacy Notice for Finance Beacon (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) describes how and why we might
        access, collect, store, use, and/or share (&ldquo;process&rdquo;) your
        personal information when you use our services
        (&ldquo;Services&rdquo;), including when you:
      </p>
      <ul className={ul}>
        <li>
          Visit our website at{' '}
          <a
            className={link}
            href="https://myfinancebeacon.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://myfinancebeacon.com/
          </a>{' '}
          or any website of ours that links to this Privacy Notice
        </li>
        <li>
          Engage with us in other related ways, including any marketing or
          events
        </li>
      </ul>
      <p className={p}>
        <strong>Questions or concerns?</strong> Reading this Privacy Notice
        will help you understand your privacy rights and choices. We are
        responsible for making decisions about how your personal information is
        processed. If you do not agree with our policies and practices, please
        do not use our Services.
      </p>

      <h2 className={h2}>Summary of Key Points</h2>
      <p className={p}>
        <em>
          This summary provides key points from our Privacy Notice, but you can
          find out more details about any of these topics by using the table of
          contents below to find the section you are looking for.
        </em>
      </p>
      <p className={p}>
        <strong>What personal information do we process?</strong> When you
        visit, use, or navigate our Services, we may process personal
        information depending on how you interact with us and the Services, the
        choices you make, and the products and features you use.
      </p>
      <p className={p}>
        <strong>Do we process any sensitive personal information?</strong> Some
        of the information may be considered &ldquo;special&rdquo; or
        &ldquo;sensitive&rdquo; in certain jurisdictions. We do not process
        sensitive personal information.
      </p>
      <p className={p}>
        <strong>Do we collect any information from third parties?</strong> We do
        not collect any information from third parties.
      </p>
      <p className={p}>
        <strong>How do we process your information?</strong> We process your
        information to provide, improve, and administer our Services,
        communicate with you, for security and fraud prevention, and to comply
        with law. We may also process your information for other purposes with
        your consent. We process your information only when we have a valid
        legal reason to do so.
      </p>
      <p className={p}>
        <strong>
          In what situations and with which parties do we share personal
          information?
        </strong>{' '}
        We may share information in specific situations and with specific third
        parties.
      </p>
      <p className={p}>
        <strong>What are your rights?</strong> Depending on where you are
        located geographically, the applicable privacy law may mean you have
        certain rights regarding your personal information.
      </p>
      <p className={p}>
        <strong>How do you exercise your rights?</strong> The easiest way to
        exercise your rights is by submitting a{' '}
        <a
          className={link}
          href={DSAR_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          data subject access request
        </a>
        , or by contacting us. We will consider and act upon any request in
        accordance with applicable data protection laws.
      </p>

      <h2 className={h2}>Table of Contents</h2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-muted">
        <li>
          <a className={link} href="#infocollect">
            What information do we collect?
          </a>
        </li>
        <li>
          <a className={link} href="#infouse">
            How do we process your information?
          </a>
        </li>
        <li>
          <a className={link} href="#whoshare">
            When and with whom do we share your personal information?
          </a>
        </li>
        <li>
          <a className={link} href="#3pwebsites">
            What is our stance on third-party websites?
          </a>
        </li>
        <li>
          <a className={link} href="#cookies">
            Do we use cookies and other tracking technologies?
          </a>
        </li>
        <li>
          <a className={link} href="#inforetain">
            How long do we keep your information?
          </a>
        </li>
        <li>
          <a className={link} href="#infominors">
            Do we collect information from minors?
          </a>
        </li>
        <li>
          <a className={link} href="#privacyrights">
            What are your privacy rights?
          </a>
        </li>
        <li>
          <a className={link} href="#DNT">
            Controls for do-not-track features
          </a>
        </li>
        <li>
          <a className={link} href="#uslaws">
            Do United States residents have specific privacy rights?
          </a>
        </li>
        <li>
          <a className={link} href="#policyupdates">
            Do we make updates to this notice?
          </a>
        </li>
        <li>
          <a className={link} href="#contact">
            How can you contact us about this notice?
          </a>
        </li>
        <li>
          <a className={link} href="#request">
            How can you review, update, or delete the data we collect from you?
          </a>
        </li>
      </ol>

      <h2 id="infocollect" className={h2}>
        1. What information do we collect?
      </h2>
      <h3 className={h3}>Personal information you disclose to us</h3>
      <p className={p}>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>We collect personal information that you provide to us.</em>
      </p>
      <p className={p}>
        We collect personal information that you voluntarily provide to us when
        you express an interest in obtaining information about us or our
        products and Services, when you participate in activities on the
        Services, or otherwise when you contact us.
      </p>
      <p className={p}>
        <strong>Personal Information Provided by You.</strong> The personal
        information that we collect depends on the context of your interactions
        with us and the Services, the choices you make, and the products and
        features you use. The personal information we collect may include the
        following:
      </p>
      <ul className={ul}>
        <li>
          The financial information you enter into our calculators is processed
          entirely within your browser and is never transmitted to or stored on
          our servers. We do not retain any financial data you input into our
          tools.
        </li>
      </ul>
      <p className={p}>
        <strong>Sensitive Information.</strong> We do not process sensitive
        information.
      </p>
      <p className={p}>
        All personal information that you provide to us must be true, complete,
        and accurate, and you must notify us of any changes to such personal
        information.
      </p>

      <h2 id="infouse" className={h2}>
        2. How do we process your information?
      </h2>
      <p className={p}>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We process your information to provide, improve, and administer our
          Services, communicate with you, for security and fraud prevention,
          and to comply with law. We may also process your information for other
          purposes with your consent.
        </em>
      </p>
      <p className={p}>
        <strong>
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </strong>
      </p>
      <ul className={ul}>
        <li>
          <strong>To deliver targeted advertising to you.</strong> We may
          process your information to develop and display personalized content
          and advertising tailored to your interests, location, and more.
        </li>
      </ul>

      <h2 id="whoshare" className={h2}>
        3. When and with whom do we share your personal information?
      </h2>
      <p className={p}>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We may share information in specific situations described in this
          section and/or with the following third parties.
        </em>
      </p>
      <p className={p}>
        We may need to share your personal information in the following
        situations:
      </p>
      <ul className={ul}>
        <li>
          <strong>Business Transfers.</strong> We may share or transfer your
          information in connection with, or during negotiations of, any merger,
          sale of company assets, financing, or acquisition of all or a portion
          of our business to another company.
        </li>
      </ul>

      <h2 id="3pwebsites" className={h2}>
        4. What is our stance on third-party websites?
      </h2>
      <p className={p}>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We are not responsible for the safety of any information that you
          share with third parties that we may link to or who advertise on our
          Services, but are not affiliated with, our Services.
        </em>
      </p>
      <p className={p}>
        The Services may link to third-party websites, online services, or
        mobile applications and/or contain advertisements from third parties
        that are not affiliated with us and which may link to other websites,
        services, or applications. Accordingly, we do not make any guarantee
        regarding any such third parties, and we will not be liable for any loss
        or damage caused by the use of such third-party websites, services, or
        applications. The inclusion of a link towards a third-party website,
        service, or application does not imply an endorsement by us. We cannot
        guarantee the safety and privacy of data you provide to any third-party
        websites. Any data collected by third parties is not covered by this
        Privacy Notice. We are not responsible for the content or privacy and
        security practices and policies of any third parties, including other
        websites, services, or applications that may be linked to or from the
        Services. You should review the policies of such third parties and
        contact them directly to respond to your questions.
      </p>

      <h2 id="cookies" className={h2}>
        5. Do we use cookies and other tracking technologies?
      </h2>
      <p className={p}>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We may use cookies and other tracking technologies to collect and
          store your information.
        </em>
      </p>
      <p className={p}>
        We may use cookies and similar tracking technologies (like web beacons
        and pixels) to gather information when you interact with our Services.
        Some online tracking technologies help us maintain the security of our
        Services, prevent crashes, fix bugs, save your preferences, and assist
        with basic site functions.
      </p>
      <p className={p}>
        We also permit third parties and service providers to use online
        tracking technologies on our Services for analytics and advertising,
        including to help manage and display advertisements, to tailor
        advertisements to your interests, or to send abandoned shopping cart
        reminders (depending on your communication preferences). The third
        parties and service providers use their technology to provide
        advertising about products and services tailored to your interests which
        may appear either on our Services or on other websites.
      </p>
      <p className={p}>
        To the extent these online tracking technologies are deemed to be a
        &ldquo;sale&rdquo;/&ldquo;sharing&rdquo; (which includes targeted
        advertising, as defined under the applicable laws) under applicable US
        state laws, you can opt out of these online tracking technologies by
        submitting a request as described below under section{' '}
        <a className={link} href="#uslaws">
          &ldquo;Do United States residents have specific privacy rights?&rdquo;
        </a>
      </p>
      <p className={p}>
        Specific information about how we use such technologies and how you can
        refuse certain cookies is set out in our Cookie Notice.
      </p>

      <h2 id="inforetain" className={h2}>
        6. How long do we keep your information?
      </h2>
      <p className={p}>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We keep your information for as long as necessary to fulfill the
          purposes outlined in this Privacy Notice unless otherwise required by
          law.
        </em>
      </p>
      <p className={p}>
        We will only keep your personal information for as long as it is
        necessary for the purposes set out in this Privacy Notice, unless a
        longer retention period is required or permitted by law (such as tax,
        accounting, or other legal requirements).
      </p>
      <p className={p}>
        When we have no ongoing legitimate business need to process your personal
        information, we will either delete or anonymize such information, or, if
        this is not possible (for example, because your personal information has
        been stored in backup archives), then we will securely store your
        personal information and isolate it from any further processing until
        deletion is possible.
      </p>

      <h2 id="infominors" className={h2}>
        7. Do we collect information from minors?
      </h2>
      <p className={p}>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We do not knowingly collect data from or market to children under 18
          years of age.
        </em>
      </p>
      <p className={p}>
        We do not knowingly collect, solicit data from, or market to children
        under 18 years of age, nor do we knowingly sell such personal
        information. By using the Services, you represent that you are at least
        18 or that you are the parent or guardian of such a minor and consent to
        such minor dependent&rsquo;s use of the Services. If we learn that
        personal information from users less than 18 years of age has been
        collected, we will deactivate the account and take reasonable measures
        to promptly delete such data from our records. If you become aware of
        any data we may have collected from children under age 18, please
        contact us.
      </p>

      <h2 id="privacyrights" className={h2}>
        8. What are your privacy rights?
      </h2>
      <p className={p}>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          You may review, change, or terminate your account at any time,
          depending on your country, province, or state of residence.
        </em>
      </p>
      <h3 className={h3}>Withdrawing your consent</h3>
      <p className={p}>
        If we are relying on your consent to process your personal information,
        which may be express and/or implied consent depending on the applicable
        law, you have the right to withdraw your consent at any time. You can
        withdraw your consent at any time by contacting us by using the contact
        details provided in the section{' '}
        <a className={link} href="#contact">
          &ldquo;How can you contact us about this notice?&rdquo;
        </a>{' '}
        below.
      </p>
      <p className={p}>
        However, please note that this will not affect the lawfulness of the
        processing before its withdrawal nor, when applicable law allows, will
        it affect the processing of your personal information conducted in
        reliance on lawful processing grounds other than consent.
      </p>
      <h3 className={h3}>Cookies and similar technologies</h3>
      <p className={p}>
        Most Web browsers are set to accept cookies by default. If you prefer,
        you can usually choose to set your browser to remove cookies and to
        reject cookies. If you choose to remove cookies or reject cookies, this
        could affect certain features or services of our Services. You may also{' '}
        <a
          className={link}
          href="http://www.aboutads.info/choices/"
          target="_blank"
          rel="noopener noreferrer"
        >
          opt out of interest-based advertising by advertisers
        </a>{' '}
        on our Services.
      </p>

      <h2 id="DNT" className={h2}>
        9. Controls for do-not-track features
      </h2>
      <p className={p}>
        Most web browsers and some mobile operating systems and mobile
        applications include a Do-Not-Track (&ldquo;DNT&rdquo;) feature or
        setting you can activate to signal your privacy preference not to have
        data about your online browsing activities monitored and collected. At
        this stage, no uniform technology standard for recognizing and
        implementing DNT signals has been finalized. As such, we do not
        currently respond to DNT browser signals or any other mechanism that
        automatically communicates your choice not to be tracked online. If a
        standard for online tracking is adopted that we must follow in the
        future, we will inform you about that practice in a revised version of
        this Privacy Notice.
      </p>
      <p className={p}>
        California law requires us to let you know how we respond to web browser
        DNT signals. Because there currently is not an industry or legal
        standard for recognizing or honoring DNT signals, we do not respond to
        them at this time.
      </p>

      <h2 id="uslaws" className={h2}>
        10. Do United States residents have specific privacy rights?
      </h2>
      <p className={p}>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          If you are a resident of California, Colorado, Connecticut, Delaware,
          Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana,
          Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee,
          Texas, Utah, or Virginia, you may have the right to request access to
          and receive details about the personal information we maintain about
          you and how we have processed it, correct inaccuracies, get a copy of,
          or delete your personal information. You may also have the right to
          withdraw your consent to our processing of your personal information.
          These rights may be limited in some circumstances by applicable law.
        </em>
      </p>
      <h3 className={h3}>Categories of Personal Information We Collect</h3>
      <p className={p}>
        The table below shows the categories of personal information we have
        collected in the past twelve (12) months.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm text-muted">
          <thead>
            <tr className="bg-surface">
              <th className="border border-border px-3 py-2 text-left font-semibold text-navy">
                Category
              </th>
              <th className="border border-border px-3 py-2 text-left font-semibold text-navy">
                Examples
              </th>
              <th className="border border-border px-3 py-2 text-center font-semibold text-navy">
                Collected
              </th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((c) => (
              <tr key={c.label}>
                <td className="border border-border px-3 py-2 align-top">
                  {c.label}
                </td>
                <td
                  className="border border-border px-3 py-2 align-top"
                  dangerouslySetInnerHTML={{ __html: c.examples }}
                />
                <td className="border border-border px-3 py-2 text-center align-middle">
                  NO
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={p}>
        We may also collect other personal information outside of these
        categories through instances where you interact with us in person,
        online, or by phone or mail in the context of receiving help through our
        customer support channels; participation in customer surveys or
        contests; and facilitation in the delivery of our Services and to
        respond to your inquiries.
      </p>
      <h3 className={h3}>How We Use and Share Personal Information</h3>
      <p className={p}>
        We may disclose your personal information with our service providers
        pursuant to a written contract between us and each service provider. We
        may use your personal information for our own business purposes, such as
        for undertaking internal research for technological development and
        demonstration. This is not considered to be &ldquo;selling&rdquo; of
        your personal information. We have not disclosed, sold, or shared any
        personal information to third parties for a business or commercial
        purpose in the preceding twelve (12) months. We will not sell or share
        personal information in the future belonging to website visitors, users,
        and other consumers.
      </p>
      <h3 className={h3}>Your Rights</h3>
      <p className={p}>
        You have rights under certain US state data protection laws. However,
        these rights are not absolute, and in certain cases, we may decline your
        request as permitted by law. These rights include:
      </p>
      <ul className={ul}>
        <li>
          <strong>Right to know</strong> whether or not we are processing your
          personal data
        </li>
        <li>
          <strong>Right to access</strong> your personal data
        </li>
        <li>
          <strong>Right to correct</strong> inaccuracies in your personal data
        </li>
        <li>
          <strong>Right to request</strong> the deletion of your personal data
        </li>
        <li>
          <strong>Right to obtain a copy</strong> of the personal data you
          previously shared with us
        </li>
        <li>
          <strong>Right to non-discrimination</strong> for exercising your
          rights
        </li>
        <li>
          <strong>Right to opt out</strong> of the processing of your personal
          data if it is used for targeted advertising (or sharing as defined
          under California&rsquo;s privacy law), the sale of personal data, or
          profiling in furtherance of decisions that produce legal or similarly
          significant effects
        </li>
      </ul>
      <h3 className={h3}>How to Exercise Your Rights</h3>
      <p className={p}>
        To exercise these rights, you can contact us by submitting a{' '}
        <a
          className={link}
          href={DSAR_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          data subject access request
        </a>
        , by visiting{' '}
        <a
          className={link}
          href="https://myfinancebeacon.com/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://myfinancebeacon.com/contact
        </a>
        , or by referring to the contact details at the bottom of this document.
      </p>
      <p className={p}>
        Under certain US state data protection laws, you can designate an
        authorized agent to make a request on your behalf. We may deny a request
        from an authorized agent that does not submit proof that they have been
        validly authorized to act on your behalf in accordance with applicable
        laws.
      </p>
      <h3 className={h3}>Request Verification</h3>
      <p className={p}>
        Upon receiving your request, we will need to verify your identity to
        determine you are the same person about whom we have the information in
        our system. We will only use personal information provided in your
        request to verify your identity or authority to make the request.
      </p>

      <h2 id="policyupdates" className={h2}>
        11. Do we make updates to this notice?
      </h2>
      <p className={p}>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          Yes, we will update this notice as necessary to stay compliant with
          relevant laws.
        </em>
      </p>
      <p className={p}>
        We may update this Privacy Notice from time to time. The updated version
        will be indicated by an updated &ldquo;Revised&rdquo; date at the top of
        this Privacy Notice. If we make material changes to this Privacy Notice,
        we may notify you either by prominently posting a notice of such changes
        or by directly sending you a notification. We encourage you to review
        this Privacy Notice frequently to be informed of how we are protecting
        your information.
      </p>

      <h2 id="contact" className={h2}>
        12. How can you contact us about this notice?
      </h2>
      <p className={p}>
        If you have questions or comments about this notice, you may contact us
        by post at:
      </p>
      <address className="mt-3 not-italic leading-relaxed text-muted">
        Finance Beacon
        <br />
        1601 30th Ave
        <br />
        San Francisco, CA 94122
        <br />
        United States
      </address>

      <h2 id="request" className={h2}>
        13. How can you review, update, or delete the data we collect from you?
      </h2>
      <p className={p}>
        Based on the applicable laws of your country or state of residence in
        the US, you may have the right to request access to the personal
        information we collect from you, details about how we have processed it,
        correct inaccuracies, or delete your personal information. You may also
        have the right to withdraw your consent to our processing of your
        personal information. These rights may be limited in some circumstances
        by applicable law. To request to review, update, or delete your personal
        information, please fill out and submit a{' '}
        <a
          className={link}
          href={DSAR_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          data subject access request
        </a>
        .
      </p>

      <p className="mt-10 text-sm text-muted">
        This Privacy Policy was created using Termly&rsquo;s{' '}
        <a
          className={link}
          href="https://termly.io/products/privacy-policy-generator/"
          target="_blank"
          rel="noopener noreferrer external"
        >
          Privacy Policy Generator
        </a>
        .
      </p>
    </div>
  )
}
