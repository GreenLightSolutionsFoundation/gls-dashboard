export function getAll() {
  // eslint-disable-line import/prefer-default-export
  return Promise.resolve([
    {
      id: 1,
      projectName: 'Build Us Hope',
      partnerName: 'Singleton Community Services, INC.',
      logo: 'http://buildushope.com/uploads/3/4/9/7/34974251/1466964601.png',
      projectDescription: 'Design and build an affordable and sustainable tiny home community.',
      openPositions: 5,
      totalPositions: 10,
      projectStartDate: new Date(2017, 8, 15),
      projectEndDate: new Date(2017, 12, 14),
    },
    {
      id: 2,
      projectName: 'Shaw Montessori Project',
      partnerName: 'Augustus H. Shaw Jr. Elementary School',
      logo: 'http://shaw.phxschools.org/common/phxschools/images/district_school_logo.png',
      projectDescription: `This project is focused on the development of a comprehensive
        plan for a sustainable permeable paver system as well as acquiring funding for implementation.`,
      openPositions: 5,
      totalPositions: 10,
      projectStartDate: new Date(2017, 8, 15),
      projectEndDate: new Date(2017, 12, 14),
    },
    {
      id: 3,
      projectName: 'Build Us Hope',
      partnerName: 'Singleton Community Services, INC.',
      logo: 'http://buildushope.com/uploads/3/4/9/7/34974251/1466964601.png',
      projectDescription: 'Design and build an affordable and sustainable tiny home community.',
      openPositions: 0,
      totalPositions: 10,
      projectStartDate: new Date(2017, 8, 15),
      projectEndDate: new Date(2017, 12, 14),
    },
    {
      id: 4,
      projectName: 'Shaw Montessori Project',
      partnerName: 'Augustus H. Shaw Jr. Elementary School',
      logo: 'http://shaw.phxschools.org/common/phxschools/images/district_school_logo.png',
      projectDescription: `This project is focused on the development of a comprehensive
        plan for a sustainable permeable paver system as well as acquiring funding for implementation.`,
      openPositions: 5,
      totalPositions: 10,
      projectStartDate: new Date(2017, 8, 15),
      projectEndDate: new Date(2017, 12, 14),
    },
    {
      id: 5,
      projectName: 'Build Us Hope',
      partnerName: 'Singleton Community Services, INC.',
      logo: 'http://buildushope.com/uploads/3/4/9/7/34974251/1466964601.png',
      projectDescription: 'Design and build an affordable and sustainable tiny home community.',
      openPositions: 5,
      totalPositions: 10,
      projectStartDate: new Date(2017, 8, 15),
      projectEndDate: new Date(2017, 12, 14),
    },
  ]);
}

export function submitSelectedProjects(selectedProjectIds) {
  return Promise.resolve(selectedProjectIds);
}
