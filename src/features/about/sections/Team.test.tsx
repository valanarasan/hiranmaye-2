import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Team } from './Team';
import { team, teamSection } from '@/content/team';

const memberArticle = (name: string): HTMLElement =>
  screen.getByRole('heading', { level: 3, name }).closest('article') as HTMLElement;

const memberHeader = (name: string): HTMLElement =>
  memberArticle(name).querySelector('header') as HTMLElement;

const withMeta = team.filter((member) => member.meta);
const withoutMeta = team.filter((member) => !member.meta);

describe('Team', () => {
  it('anchors itself at #team for the in-page links that point here', () => {
    render(<Team />);

    const region = screen.getByRole('region', { name: teamSection.headline });
    expect(region).toHaveAttribute('id', 'team');
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'team-title');
  });

  it('renders the section header from the team content', () => {
    render(<Team />);

    expect(screen.getByText(teamSection.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: teamSection.headline }),
    ).toBeInTheDocument();
    expect(screen.getByText(teamSection.lead)).toBeInTheDocument();
  });

  it('renders one article per team member', () => {
    render(<Team />);

    expect(screen.getAllByRole('article')).toHaveLength(team.length);
  });

  it.each(team.map((member) => [member.name, member.role] as const))(
    'introduces %s by role',
    (name, role) => {
      render(<Team />);

      expect(within(memberHeader(name)).getByText(role)).toBeInTheDocument();
    },
  );

  it.each(withMeta.map((member) => [member.name, member.meta as string] as const))(
    'adds the standing line under %s',
    (name, meta) => {
      render(<Team />);

      const lines = memberHeader(name).querySelectorAll('p');
      // The role paragraph, then the standing line — in that order.
      expect(lines).toHaveLength(2);
      expect(lines[1]).toHaveTextContent(meta);
    },
  );

  it.each(withoutMeta.map((member) => [member.name] as const))(
    'leaves the standing line out for %s',
    (name) => {
      render(<Team />);

      // Only the role paragraph remains under the name.
      expect(memberHeader(name).querySelectorAll('p')).toHaveLength(1);
    },
  );

  it.each(team.map((member) => [member.name, member.paragraphs] as const))(
    'renders every paragraph of the %s bio',
    (name, paragraphs) => {
      render(<Team />);

      const article = memberArticle(name);
      paragraphs.forEach((paragraph) => {
        expect(within(article).getByText(paragraph)).toBeInTheDocument();
      });
    },
  );
});
