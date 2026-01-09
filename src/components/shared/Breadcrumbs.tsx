import { useOrderStore } from '@/store/useOrderStore';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbSegment {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  currentPage: string;
  segments?: BreadcrumbSegment[];
  parentPage?: string;
  onParentClick?: () => void;
}

export const Breadcrumbs = ({ currentPage, segments, parentPage, onParentClick }: BreadcrumbsProps) => {
  const setStep = useOrderStore((s) => s.setStep);
  const setView = useOrderStore((s) => s.setView);

  const handleHomeClick = () => {
    setView('order');
    setStep(1);
  };

  return (
    <Breadcrumb className="font-inter">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={handleHomeClick} className="cursor-pointer">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        {segments && segments.map((segment, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbLink onClick={segment.onClick} className="cursor-pointer">
                {segment.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}

        {parentPage && !segments && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={onParentClick} className="cursor-pointer">
                {parentPage}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold text-gray-900">{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};