export interface DataProp {
  id: string;
  userId: string;
  title: string;
  body: string;
  type:  "kyc" | "deposit" | "withdrawal" | "security";
  isRead: boolean;
  createdAt: string;
}

export interface MetaProp {
  count: number;
  unread: number;
}

export interface NotificationDataProp {
  data: DataProp[];
  meta: MetaProp;
}

export const NOTIFICATION_DATA: NotificationDataProp = {
  data: [
    {
      id: "ntf_kyc",
      userId: "usr_student",
      title: "KYC Approved",
      body: "Your account is ready for sandbox trading.",
      type: "kyc",
      isRead: false,
      createdAt: "2026-05-03T14:08:00.000Z",
    },
    {
      id: "ntf_deposit_1",
      userId: "usr_student",
      title: "Deposit Successful",
      body: "You have successfully deposited ₦50,000.",
      type: "deposit",
      isRead: false,
      createdAt: "2026-05-08T09:12:00.000Z",
    },
    {
      id: "ntf_withdrawal_1",
      userId: "usr_student",
      title: "Withdrawal Successful",
      body: "You have successfully withdrawn ₦20,000.",
      type: "withdrawal",
      isRead: true,
      createdAt: "2026-05-07T18:45:00.000Z",
    },
    {
      id: "ntf_security_1",
      userId: "usr_student",
      title: "Login From Unknown Device",
      body: "Your account was logged in from a new device.",
      type: "security",
      isRead: false,
      createdAt: "2026-05-06T11:30:00.000Z",
    },
    {
      id: "ntf_kyc_1",
      userId: "usr_student",
      title: "KYC Approved",
      body: "Your account is ready for sandbox trading.",
      type: "kyc",
      isRead: false,
      createdAt: "2026-05-03T14:08:00.000Z",
    },
    {
      id: "ntf_deposit_2",
      userId: "usr_student",
      title: "Deposit Successful",
      body: "You have successfully deposited ₦50,000.",
      type: "deposit",
      isRead: false,
      createdAt: "2026-05-08T09:12:00.000Z",
    },
    {
      id: "ntf_withdrawal_2",
      userId: "usr_student",
      title: "Withdrawal Successful",
      body: "You have successfully withdrawn ₦20,000.",
      type: "withdrawal",
      isRead: true,
      createdAt: "2026-05-07T18:45:00.000Z",
    },
    {
      id: "ntf_security_2",
      userId: "usr_student",
      title: "Login From Unknown Device",
      body: "Your account was logged in from a new device.",
      type: "security",
      isRead: false,
      createdAt: "2026-05-06T11:30:00.000Z",
    },
    {
      id: "ntf_kyc_3",
      userId: "usr_student",
      title: "KYC Approved",
      body: "Your account is ready for sandbox trading.",
      type: "kyc",
      isRead: false,
      createdAt: "2026-05-03T14:08:00.000Z",
    },
    {
      id: "ntf_deposit_3",
      userId: "usr_student",
      title: "Deposit Successful",
      body: "You have successfully deposited ₦50,000.",
      type: "deposit",
      isRead: false,
      createdAt: "2026-05-08T09:12:00.000Z",
    },
    {
      id: "ntf_withdrawal_3",
      userId: "usr_student",
      title: "Withdrawal Successful",
      body: "You have successfully withdrawn ₦20,000.",
      type: "withdrawal",
      isRead: true,
      createdAt: "2026-05-07T18:45:00.000Z",
    },
    {
      id: "ntf_security_3",
      userId: "usr_student",
      title: "Login From Unknown Device",
      body: "Your account was logged in from a new device.",
      type: "security",
      isRead: false,
      createdAt: "2026-05-06T11:30:00.000Z",
    },
  ],
  meta: {
    count: 12,
    unread: 3,
  },
};
