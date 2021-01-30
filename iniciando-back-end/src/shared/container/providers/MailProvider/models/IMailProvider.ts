import ISendMaiDTO from "../dtos/ISendMaiDTO";

export default interface IMailProvider {
  sendMail(data: ISendMaiDTO): Promise<void>;
}
