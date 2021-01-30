import ISendMailDTO from "../dtos/ISendMaiDTO";
import IMailProvider from "../models/IMailProvider";

class FakeMailProvider implements IMailProvider {

  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
