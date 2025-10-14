import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as fsPromise from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FsHelpers {
  async uploadFile(file: Express.Multer.File) {
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${uuidv4()}${ext}`;

    await fsPromise.writeFile(path.join(uploadDir, fileName), file.buffer);
    return fileName;
  }

  async deleteFile(fileName: string) {
    const filePath = path.join(process.cwd(), 'uploads', fileName);
    try {
      await fsPromise.unlink(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
