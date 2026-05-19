import { useState } from 'react';
import {
  Button,
  FormField,
  Heading,
  InputText,
  Paragraph,
} from '@govie-ds/react';
import { CERT_CONTENT, CERT_TYPE_LABEL } from '../../data/content';
import type { JourneyState } from '../../state/journey';

type Props = {
  journey: JourneyState;
  onBack: () => void;
  onPay: (email: string) => void;
};

function formatFee(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

export function StepPayment({ journey, onBack, onPay }: Props) {
  const [email, setEmail] = useState(journey.deliveryEmail);
  const content = CERT_CONTENT[journey.certType];
  const fee = formatFee(content.feeCents);
  const record = journey.selectedRecord;

  if (!record) {
    return (
      <div className="flex flex-col gap-md">
        <Paragraph>
          No certificate selected. Please go back to Step 1.
        </Paragraph>
        <Button onClick={onBack}>Back</Button>
      </div>
    );
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="flex flex-col gap-2xl max-w-[640px]">
      <div className="flex flex-col gap-md">
        <Paragraph>Step 2 of 3</Paragraph>
        <Heading as="h1">Pay for your certificate</Heading>
        <Paragraph>
          You’re ordering a {CERT_TYPE_LABEL[record.certType].toLowerCase()}.
          The fee is {fee}.
        </Paragraph>
      </div>

      <div className="bg-gray-100 p-lg flex flex-col gap-md">
        <strong>Order summary</strong>
        <div className="flex justify-between">
          <span>{CERT_TYPE_LABEL[record.certType]}</span>
          <span>{fee}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-sm">
          <span>Total</span>
          <span>{fee}</span>
        </div>
      </div>

      <FormField
        label={{ text: 'Email address for notifications' }}
        hint={{
          text:
            'We’ll send a secure message to your MessagingIE inbox when your certificate is ready. We’ll also notify this address.',
        }}
      >
        <InputText
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.ie"
        />
      </FormField>

      <Paragraph>
        Clicking <strong>Pay {fee}</strong> takes you to PaymentsIE (mocked for
        this prototype) to complete payment.
      </Paragraph>

      <div className="flex flex-wrap items-center gap-md sm:gap-xl">
        <Button variant="flat" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="primary"
          onClick={() => onPay(email)}
          disabled={!emailValid}
        >
          Pay {fee}
        </Button>
      </div>
    </div>
  );
}
