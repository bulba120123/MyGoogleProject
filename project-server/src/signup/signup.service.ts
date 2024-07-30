import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class SignupService {
  async signup(): Promise<string> {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--incognito'] });
    // const context = await browser.createBrowserContext();
    // const page = await context.newPage();


    const [ browserPage ] = await browser.pages();
    await browserPage.goto("https://www.google.com/intl/en/gmail/about/", { waitUntil: 'networkidle2' });

    try {
      // 캐시를 삭제합니다.
      await browserPage.setCacheEnabled(false);

      // await browserPage.goto('https://www.google.com/', { waitUntil: 'networkidle2' });
      
      // await browserPage.type('#id_input_selector', id);
      // await browserPage.type('#password_input_selector', password);
      await browserPage.click('.dropdown__icon svg');
      
      // await browserPage.waitForNavigation({ waitUntil: 'networkidle2' });

      // const successMessage = await browserPage.$eval('#success_message_selector', el => el.textContent);

      // await browser.close();

      // return successMessage ? 'Signup successful' : 'Signup failed';
      return 'success'
    } catch (error) {
      await browser.close();
      throw new Error('Signup failed: ' + error.message);
    }
  }
}