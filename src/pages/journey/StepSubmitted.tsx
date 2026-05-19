import {
  Alert,
  Button,
  Heading,
  Link,
  Paragraph,
  SummaryList,
  SummaryListRow,
  SummaryListValue,
} from '@govie-ds/react';
import { CERT_TYPE_LABEL } from '../../data/content';
import type { JourneyState } from '../../state/journey';

type Props = {
  journey: JourneyState;
  onDone: () => void;
};

export function StepSubmitted({ journey, onDone }: Props) {
  const record = journey.selectedRecord;
  const reference = journey.referenceNumber ?? 'CL-2026-104872';
  const today = new Date().toLocaleDateString('en-IE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col gap-2xl max-w-[704px]">
      <Alert variant="success" title="Your request has been submitted">
        We’ll send a secure message to your MessagingIE inbox when your
        certificate is ready to download.
      </Alert>

      <div className="flex flex-col gap-md">
        <Heading as="h1">What happens next</Heading>
        <Paragraph>
          Expected delivery is within 3 working days. You can return to your
          Life Events Dashboard at any time to check the status of this
          request.
        </Paragraph>
      </div>

      <SummaryList>
        <SummaryListRow label="Reference number">
          <SummaryListValue>{reference}</SummaryListValue>
        </SummaryListRow>
        <SummaryListRow label="Submitted">
          <SummaryListValue>{today}</SummaryListValue>
        </SummaryListRow>
        <SummaryListRow label="Certificate type">
          <SummaryListValue>
            {record ? CERT_TYPE_LABEL[record.certType] : '—'}
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow label="Expected delivery">
          <SummaryListValue>Within 3 working days</SummaryListValue>
        </SummaryListRow>
      </SummaryList>

      <div className="flex flex-col items-start gap-md sm:flex-row sm:items-center sm:gap-xl">
        <Button variant="primary" onClick={onDone}>
          Go to Life Events Dashboard
        </Button>
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onDone();
          }}
        >
          Start a new request
        </Link>
      </div>
    </div>
  );
}
