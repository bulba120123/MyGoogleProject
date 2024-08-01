import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class SignupService {
  async signup(): Promise<string> {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito'],
    });
    // const context = await browser.createBrowserContext();
    // const page = await context.newPage();

    const [browserPage] = await browser.pages();
    await browserPage.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    );

    await browserPage.goto('https://www.google.com/intl/en/gmail/about/', {
      waitUntil: 'networkidle2',
    });

    try {
      // 캐시를 삭제합니다.
      await browserPage.setCacheEnabled(false);

      // await browserPage.goto('https://www.google.com/', { waitUntil: 'networkidle2' });

      // await browserPage.type('#id_input_selector', id);
      // await browserPage.type('#password_input_selector', password);
      const detailsSelector =
        'details.dropdown[data-category="cta"][data-action="create an account dropdown"]';
      const summarySelector = 'summary.dropdown__summary';
      const iconSelector = 'div.dropdown__icon';
      // https://accounts.google.com/lifecycle/steps/signup/name?
      // continue=https://mail.google.com/mail/
      // &ddm=0
      // &flowEntry=SignUp
      // &flowName=GlifWebSignIn
      // &rip=1
      // &service=mail
      // await browserPage.waitForSelector(detailsSelector, { visible: true });
      // console.log('Details element found.');

      // await browserPage.waitForSelector(`${summarySelector} ${iconSelector}`, { visible: true });
      // console.log('Icon element found inside summary.');

      // await browserPage.waitForNavigation({ waitUntil: 'networkidle2' });

      // const successMessage = await browserPage.$eval('#success_message_selector', el => el.textContent);

      // await browser.close();

      // return successMessage ? 'Signup successful' : 'Signup failed';
      return 'success';
    } catch (error) {
      await browser.close();
      throw new Error('Signup failed: ' + error.message);
    }
  }
}
