import emailjs from '@emailjs/browser';

/**
 * Fixed recipient email address for private date invitation notifications.
 * The visitor cannot change or override this address.
 */
export const FIXED_RECIPIENT_EMAIL = 'bariksuryakant094@gmail.com';

/**
 * Format timestamp in Asia/Kolkata timezone
 */
export function getKolkataTimestamp() {
  const options = {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-IN', options).format(new Date()) + ' (IST)';
}

/**
 * Format human-readable date
 */
export function formatDisplayDate(dateStr) {
  if (!dateStr) return 'Not selected';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return dateStr;
  }
}

/**
 * Check if EmailJS configuration is present in environment variables
 */
export function isEmailConfigured() {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  return Boolean(
    publicKey &&
    serviceId &&
    templateId &&
    publicKey !== 'your_emailjs_public_key' &&
    serviceId !== 'your_emailjs_service_id' &&
    templateId !== 'your_emailjs_template_id'
  );
}

/**
 * Send the date invitation details via EmailJS
 * @param {Object} dateDetails
 * @returns {Promise<{ success: boolean, message: string, details?: any }>}
 */
export async function sendDateInvitationEmail(dateDetails) {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  const kolkataTime = getKolkataTimestamp();

  // Template parameters for EmailJS
  const templateParams = {
    to_email: FIXED_RECIPIENT_EMAIL,
    to_name: 'Suryakant',
    subject: 'Someone just planned a little date with you ❤️',
    hero_response: dateDetails.heroResponse || 'YES! OF COURSE ❤️',
    drink: dateDetails.drink || 'Not selected',
    location: dateDetails.location || 'Bhubaneswar, Odisha',
    date: formatDisplayDate(dateDetails.date),
    time: dateDetails.time || 'Not selected',
    outfit: dateDetails.outfit || 'Casual and comfy',
    snacks: dateDetails.snacks || 'Together',
    personal_message: dateDetails.personalMessage?.trim() || '(No extra note added - just pure love! ❤️)',
    submission_timestamp: kolkataTime,
  };

  // If EmailJS credentials are not configured yet, return a clear structured response
  if (!isEmailConfigured()) {
    console.warn(
      '[EmailService] EmailJS is not configured with real API keys in .env. Here is the payload that would be sent:',
      templateParams
    );
    return {
      success: false,
      isConfigMissing: true,
      message: 'EmailJS keys are not configured yet in .env.',
      payload: templateParams,
    };
  }

  try {
    // Send email using @emailjs/browser
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response.status === 200 || response.text === 'OK') {
      return {
        success: true,
        message: 'Invitation email successfully sent!',
        details: response,
      };
    } else {
      throw new Error(`EmailJS responded with status ${response.status}: ${response.text}`);
    }
  } catch (error) {
    console.error('[EmailService] Failed to send email via EmailJS:', error);
    return {
      success: false,
      isConfigMissing: false,
      message: error?.text || error?.message || 'Failed to send notification via EmailJS.',
      error,
    };
  }
}

