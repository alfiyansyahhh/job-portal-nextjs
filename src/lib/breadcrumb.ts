const LABEL_MAP: Record<string, string> = {
  jobs: 'Jobs',
  'job-list': 'Job List',
};

const JOB_ID_REGEX = /^job_\d{8}_\d{4}$/;

export function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);

  return segments
    .filter((segment) => !JOB_ID_REGEX.test(segment))
    .map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');

      return {
        raw: segment,
        label: LABEL_MAP[segment] || capitalize(segment),
        href,
        isLast: index === segments.length - 1,
      };
    });
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
