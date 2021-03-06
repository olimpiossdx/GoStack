import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMaiDTO';
import IMailProvider from '../models/IMailProvider';
import mailConfig from '@config/mail';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_DEFAULT_REGION
      })
    });
  }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        address: to.email,
        name: to.name
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
export default SESMailProvider;
