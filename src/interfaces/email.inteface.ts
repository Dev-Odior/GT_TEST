export interface EmailAttributeI {
  to: string;
  subject: string;
  templateName?: string;
  replacements: object;
  from?: string;
  attachments?: [
    {
      filename: string;
      path: string;
    },
  ];
}
