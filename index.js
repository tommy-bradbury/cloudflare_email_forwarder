/**
 * This Worker receives an incoming email via Cloudflare Email Routing
 * and forwards it to a specified destination email address.
 * 
 * @author Tommy Bradbury
 */

export default {
  /**
   * Triggered won email recieve.
   *
   * @param {EmailMessage} message 
   * @param {Env} env
   * @param {ExecutionContext} context
   */
  async email(message, env, context)
  {
    const FORWARD_TO_EMAIL = env.FORWARD_TO_EMAIL;

    if(env.FORWARD_TO_EMAIL === undefined)
    {
        console.error("FORWARD_TO_EMAIL environment variable is not set.");
        return;
    }

    console.log(`Received email from: ${message.from}`);
    console.log(`Original recipient: ${message.to}`);
    console.log(`Attempting to forward to: ${FORWARD_TO_EMAIL}`);

    try {
      await message.forward(FORWARD_TO_EMAIL);
      console.log(`Successfully forwarded email to: ${FORWARD_TO_EMAIL}`);
    } catch(error) {
      console.error(`Failed to forward email: ${error.message}`);
    }
  },
};
