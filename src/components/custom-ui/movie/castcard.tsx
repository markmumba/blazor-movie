import movieService from "@/lib/api/movieService";
import { CastMember } from "@/lib/api/types";
import Image from "next/image";


function CastCard({member}:{member:CastMember}) {
    return (
        <div className="flex-shrink-0 w-32 space-y-2">
        <div className="aspect-[2/3] overflow-hidden rounded-lg bg-muted">
          <Image
            src={movieService.getImageUrl(member.profile_path, 'w185')}
            alt={member.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-person.jpg';
            }}
            width={1000}
            height={1000}
          />
        </div>
        <div className="space-y-1">
          <p className="font-medium text-sm leading-tight">{member.name}</p>
          <p className="text-xs text-muted-foreground leading-tight">{member.character}</p>
        </div>
      </div>
    )
}

export default CastCard;