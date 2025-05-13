'use client';

import { useForm } from 'react-hook-form';
import { JobFormData, JobType } from '../types/job';
import {
    Modal,
    TextInput,
    Select,
    Textarea,
    NumberInput,
    Button,
    Group,
    Stack,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';

interface JobCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: JobFormData) => void;
}

const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export default function JobCreateModal({ isOpen, onClose, onSubmit }: JobCreateModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<JobFormData>();

    const jobType = watch('jobType');
    const applicationDeadline = watch('applicationDeadline');

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title="Create Job Opening"
            size="xl"
            centered
            styles={{
                content: {
                    maxHeight: '90vh',
                    overflowY: 'auto',
                },
            }}
        >

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack  >
                    <Group grow>
                        <TextInput
                            label="Job Title"
                            placeholder="Full Stack Developer"
                            {...register('title', { required: 'Job title is required' })}
                            error={errors.title?.message}
                        />
                        <TextInput
                            label="Company Name"
                            placeholder="Amazon, Microsoft, Swiggy"
                            {...register('companyName', { required: 'Company name is required' })}
                            error={errors.companyName?.message}
                        />
                    </Group>

                    <Group grow>
                        <TextInput
                            label="Location"
                            placeholder="Choose Preferred Location"
                            {...register('location', { required: 'Location is required' })}
                            error={errors.location?.message}
                        />
                        <Select
                            label="Job Type"
                            placeholder="Select job type"
                            data={jobTypes}
                            value={jobType}
                            onChange={(value) => {
                                if (value) {
                                    setValue('jobType', value as JobType);
                                }
                            }}
                            error={errors.jobType?.message}
                        />
                    </Group>

                    <Group grow>
                        <Group grow>
                            <NumberInput
                                label="Minimum Salary"
                                placeholder="₹0"
                                min={0}
                                type="text"
                                onChange={(value) => setValue('salaryRange.min', Number(value))}
                                error={errors.salaryRange?.min?.message}
                            />
                            <NumberInput
                                label="Maximum Salary"
                                placeholder="₹12,00,000"
                                min={0}
                                type="text"
                                onChange={(value) => setValue('salaryRange.max', Number(value))}
                                error={errors.salaryRange?.max?.message}
                            />
                        </Group>
                        <DateInput
                            label="Application Deadline"
                            placeholder="Select deadline"
                            value={applicationDeadline}
                            onChange={(date) => {
                                if (date) {
                                    setValue('applicationDeadline', new Date(date));
                                }
                            }}
                            error={errors.applicationDeadline?.message}
                            clearable
                        />
                    </Group>

                    <Textarea
                        label="Job Description"
                        placeholder="Please share a description to let the candidate know more about the job role"
                        minRows={4}
                        {...register('description', { required: 'Job description is required' })}
                        error={errors.description?.message}
                    />

                    <Textarea
                        label="Requirements"
                        placeholder="List the requirements for this position"
                        minRows={4}
                        {...register('requirements', { required: 'Requirements are required' })}
                        error={errors.requirements?.message}
                    />

                    <Textarea
                        label="Responsibilities"
                        placeholder="List the responsibilities for this position"
                        minRows={4}
                        {...register('responsibilities', { required: 'Responsibilities are required' })}
                        error={errors.responsibilities?.message}
                    />

                    <Group justify="space-between" mt="xl">
                        <Button variant="default" onClick={onClose}>
                            Save Draft
                        </Button>
                        <Button type="submit" color="violet">
                            Publish
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}