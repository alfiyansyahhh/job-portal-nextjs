import { NextRequest, NextResponse } from 'next/server';
import { jobs } from '../../dummyData/job';
import { candidate } from '../../dummyData/candidate';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: 'Job ID is required' },
      { status: 400 }
    );
  }

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return NextResponse.json({ message: 'Job not found' }, { status: 404 });
  }

  const profileKeys = Object.keys(job.profile_requirements) as Array<
    keyof typeof job.profile_requirements
  >;

  const applicationForm = {
    sections: [
      {
        title: 'Minimum Profile Information Required',
        fields: profileKeys
          .filter((key) => job.profile_requirements[key] !== 'off')
          .map((key) => ({
            key: key,
            validation: {
              required: job.profile_requirements[key] === 'mandatory',
            },
          })),
      },
    ],
  };

  const jobCandidates = job.candidate_ids
    .map((candidateId) => candidate.find((c) => c.id === candidateId))
    .filter(Boolean);

  return NextResponse.json({
    ...job,
    application_form: applicationForm,
    candidates: jobCandidates || [],
  });
}
