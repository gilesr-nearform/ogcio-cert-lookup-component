import {
  Button,
  Heading,
  Paragraph,
  SummaryList,
  SummaryListRow,
  SummaryListValue,
  Tag,
} from '@govie-ds/react';
import { AUTHENTICATED_USER } from '../../data/scenarios';
import type { JourneyState } from '../../state/journey';

type Props = {
  journey: JourneyState;
  onBack: () => void;
  onSubmit: () => void;
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
};

function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: '' };
  return {
    first: parts.slice(0, -1).join(' '),
    last: parts[parts.length - 1],
  };
}

export function StepConfirmation({
  onBack,
  onSubmit,
  termsAccepted,
  onTermsChange,
}: Props) {
  const { first, last } = splitName(AUTHENTICATED_USER.name);

  return (
    <div className="flex flex-col gap-2xl max-w-[704px]">
      <div className="flex flex-col gap-md">
        <Paragraph>Step 2 of 2</Paragraph>
        <Heading as="h1">Confirm your details to order your certificate</Heading>
        <Paragraph>
          Provide the following details to request your official certificate.
          You’ll receive it as a secure PDF in your Life Events Dashboard
          within 3 working days.
        </Paragraph>
      </div>

      <SummaryList>
        <SummaryListRow label="First name">
          <SummaryListValue>{first}</SummaryListValue>
        </SummaryListRow>
        <SummaryListRow label="Last name">
          <SummaryListValue>{last}</SummaryListValue>
        </SummaryListRow>
        <SummaryListRow label="Email address">
          <SummaryListValue>{AUTHENTICATED_USER.email}</SummaryListValue>
        </SummaryListRow>
      </SummaryList>

      <fieldset className="flex flex-col gap-md border-0 p-0 m-0">
        <legend className="flex items-end gap-xs pb-md">
          <span className="font-bold text-lg">Consent</span>
          <Tag text="Required" type="default" />
        </legend>
        <label
          htmlFor="terms-accept"
          className="flex items-start gap-md bg-gray-100 px-md py-lg cursor-pointer"
        >
          <input
            id="terms-accept"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => onTermsChange(e.target.checked)}
            className="mt-xs w-6 h-6 shrink-0 accent-black"
          />
          <span>
            I accept the{' '}
            <a
              href="#"
              className="text-blue-700 underline"
              onClick={(e) => e.preventDefault()}
            >
              terms and conditions
            </a>
          </span>
        </label>
      </fieldset>

      <div className="flex flex-wrap items-center gap-md sm:gap-xl">
        <Button variant="flat" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!termsAccepted}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
