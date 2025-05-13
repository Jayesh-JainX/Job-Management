'use client';

import { Group, Button, Container, Image } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import JobCreateModal from './JobCreateModal';
import { jobsService } from '../services/jobs';
import { JobFormData } from '../types/job';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/', label: 'Find Jobs' },
  { href: '/', label: 'Find Talents' },
  { href: '/', label: 'About us' },
  { href: '/', label: 'Testimonials' },
];

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateJob = async (data: JobFormData) => {
    await jobsService.createJob(data);
    setIsModalOpen(false);
  };

  return (
    <header style={{ backgroundColor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
      <Container size="lg" py="md">
        <Group justify="space-center" align="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Image src="/next.svg" alt="Logo" w={32} h={32} />
          </Link>

          <Group
            gap="xl"
            visibleFrom="sm"
            style={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              gap: '2rem'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: '#4B5563',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
                onMouseOver={(e) => {
                  (e.target as HTMLAnchorElement).style.color = '#111827';
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLAnchorElement).style.color = '#4B5563';
                }}
              >
                {link.label}
              </Link>
            ))}
          </Group>

          <Button
            onClick={() => setIsModalOpen(true)}
            variant="filled"
            color="violet"
            radius="xl"
          >
            Post a Job
          </Button>
        </Group>
      </Container>

      <JobCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateJob}
      />
    </header>
  );
}
