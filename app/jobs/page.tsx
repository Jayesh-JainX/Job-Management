'use client';

import { useEffect, useState } from 'react';
import { jobsService } from '../../services/jobs';
import JobCreateModal from '../../components/JobCreateModal';
import { JobFormData, JobType, Job } from '../../types/job';
import {
  TextInput,
  Select,
  RangeSlider,
  Group,
  Card,
  Text,
  Badge,
  Button,
  Grid,
  Stack,
  Avatar,
  Container,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase, IconPlus } from '@tabler/icons-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export function JobsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<JobType | ''>('');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 50]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Load all jobs initially without filters
    loadJobs();
  }, []); // Empty dependency array for initial load

  // Separate effect for handling filter changes
  useEffect(() => {
    // Skip the initial render
    const hasActiveFilters = searchQuery || location || selectedJobType || salaryRange[0] > 0 || salaryRange[1] < 50;
    if (hasActiveFilters) {
      loadJobs();
    }
  }, [searchQuery, location, selectedJobType, salaryRange]);

  const loadJobs = async () => {
    try {
      const filters = searchQuery || location || selectedJobType || salaryRange[0] > 0 || salaryRange[1] < 50
        ? {
            title: searchQuery,
            location: location,
            jobType: selectedJobType || undefined,
            salaryRange: {
              min: salaryRange[0] * 1000,
              max: salaryRange[1] * 1000
            }
          }
        : undefined;

      console.log('Applying filters:', filters);
      const jobsData = await jobsService.getJobs(filters);
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
      // You might want to add error handling UI here
    }
  };

  const handleCreateJob = async (data: JobFormData) => {
    await jobsService.createJob(data);
    setIsModalOpen(false);
    loadJobs();
  };

  return (
    <div className="space-y-8">
      <Stack className="bg-white p-4 rounded-lg shadow">
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <TextInput
              placeholder="Search By Job Title, Role"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftSection={<IconSearch size={20} />}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <TextInput
              placeholder="Preferred Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              leftSection={<IconMapPin size={20} />}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              placeholder="Job type"
              value={selectedJobType}
              onChange={(value) => setSelectedJobType(value as JobType)}
              data={jobTypes}
              leftSection={<IconBriefcase size={20} />}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Text size="sm" c="dimmed" mb="xs">Salary Per Month (₹{salaryRange[0]}k - ₹{salaryRange[1]}k)</Text>
            <RangeSlider
              value={salaryRange}
              onChange={(value: [number, number]) => setSalaryRange(value)}
              min={0}
              max={100}
              step={5}
              minRange={10}
              label={(value) => `₹${value}k`}
            />
          </Grid.Col>
        </Grid>

        <div style={{ borderBottom: '1px solid #e0e0e0', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}></div>
      </Stack>
      <Grid gutter="md" style={{ marginTop: '30px' }}>
        {jobs.map((job) => (
          <Grid.Col key={job.id} span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="md" padding="lg" radius="lg" withBorder className="hover:shadow-lg transition-shadow">
              <Group justify="space-between" mb="md">
                <Avatar
                  src={job.companyLogo || '/company-default.svg'}
                  alt={job.companyName}
                  size="lg"
                  radius="sm"
                />
                <Badge variant="light" color="blue">{formatDistanceToNow(job.createdAt, { addSuffix: true })}</Badge>
              </Group>

              <Stack gap="xs">
                <Text fw={600} size="lg" className="text-gray-900">{job.title}</Text>
                <Text c="dimmed" size="sm" fw={500}>{job.companyName}</Text>
              </Stack>

              <Group align="center" gap="xs" mt="sm">
                <Text size="sm" fw={500}>1-3 yr Exp</Text>
                <Text size="sm" c="dimmed">•</Text>
                <Text size="sm" fw={500}>Onsite</Text>
                <Text size="sm" c="dimmed">•</Text>
                <Text size="sm" fw={500}>12LPA</Text>
              </Group>

              <Text size="sm" c="dimmed" mt="md" lineClamp={3} className="text-gray-600">
                {job.description}
              </Text>

              <Group gap="xs" mt="lg" mb="md">
                <Badge variant="light" color="blue">{job.jobType}</Badge>
                <Badge variant="light" color="teal">{job.location}</Badge>
                <Badge variant="light" color="grape">₹{job.salaryRange.min/1000}k - ₹{job.salaryRange.max/1000}k</Badge>
              </Group>

              <Button
                fullWidth
                variant="light"
                color="blue"
                size="md"
                radius="md"
                className="bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Apply Now
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <JobCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateJob}
      />
    </div>
  );
}
