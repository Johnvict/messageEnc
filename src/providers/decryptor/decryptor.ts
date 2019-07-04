import { Injectable } from "@angular/core";
import { EncryptorProvider } from "../encryptor/encryptor";
import { Events } from "ionic-angular";
declare var require: any;
@Injectable()
export class DecryptorProvider {
  aes256 = require("aes256");
  keyEnc: string;
  decryptedText: string;

  constructor(
    private events: Events,
    public encProvider: EncryptorProvider
  ) { }

  async decryptText(text: string, key) {

    var cipher = await this.aes256.createCipher(key);
    this.decryptedText = await cipher.decrypt(text);
    
    this.events.publish("Decrypted successfully");
  }

}
