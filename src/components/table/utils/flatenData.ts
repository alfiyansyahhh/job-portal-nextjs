export type CandidateAttribute = {
  key: string;
  label: string;
  value: any;
  order: number;
};

export type CandidateNested = {
  id: string;
  attributes: CandidateAttribute[];
};

export type CandidateFlat = {
  id: string;
  [key: string]: any;
};

export function flattenCandidates(data: CandidateNested[]): CandidateFlat[] {
  return data.map((item) => {
    const flat: CandidateFlat = { id: item.id };
    item.attributes.forEach((attr) => {
      flat[attr.key] = attr.value;
    });
    return flat;
  });
}
