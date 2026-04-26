"use client";

import { Camera, X } from "lucide-react";
import { useState } from "react";

import {
  FileUpload,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadList,
  FileUploadTrigger,
  Switch,
  ThemeToggleButton,
} from "@repo/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import { Button } from "@repo/ui";
import {
  UserProfileCard,
  UserProfileCardContent,
  UserProfileCardDescription,
  UserProfileCardFooter,
  UserProfileCardHeader,
  UserProfileCardTitle,
} from "@repo/ui";
import { Input } from "@repo/ui";
import { Label } from "@repo/ui";
import { cn } from "@repo/libs";
import { BackToDashboardButton } from "./BackToDashboardButton";

interface ProfileFormData {
  name: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
}

interface SettingsProfile1Props {
  defaultValues?: Partial<ProfileFormData>;
  onSave?: (data: ProfileFormData) => void;
  className?: string;
}

export const UserProfile = ({
  defaultValues = {
    name: "Alex Morgan",
    email: "alex.morgan@email.com",
    username: "alexmorgan",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
    bio: "Product designer with 8+ years of experience crafting intuitive digital experiences. Currently focused on design systems and accessibility.",
  },
  className,
}: SettingsProfile1Props) => {
  const [avatarFiles, setAvatarFiles] = useState<File[]>([]);

  const initials = defaultValues.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Get preview URL from uploaded file or use default avatar
  const avatarPreview =
    avatarFiles.length > 0
      ? URL.createObjectURL(avatarFiles[0])
      : defaultValues.avatar;

  /* custom states */
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  /* custom handler */
  function handleShareSwitch() {
    console.log("hiii");
    setIsSwitchOn(!isSwitchOn);
  }
  return (
    <UserProfileCard className={cn("w-full max-w-xl px-6", className)}>
      <div className="flex w-full items-center justify-between">
        <BackToDashboardButton />
        <ThemeToggleButton />
      </div>
      <UserProfileCardHeader className="text-start">
        <UserProfileCardTitle>Profile</UserProfileCardTitle>
        <UserProfileCardDescription>
          Update your personal information and profile picture
        </UserProfileCardDescription>
      </UserProfileCardHeader>
      <UserProfileCardContent className="space-y-6">
        {/* Avatar Upload */}
        <FileUpload
          className="items-center"
          value={avatarFiles}
          onValueChange={setAvatarFiles}
          accept="image/*"
          maxFiles={1}
          maxSize={2 * 1024 * 1024}
        >
          <div className="flex items-center gap-4">
            <FileUploadTrigger asChild>
              <button
                type="button"
                className="group focus-visible:ring-ring relative size-20 shrink-0 cursor-pointer rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Avatar className="size-20">
                  <AvatarImage
                    src={avatarPreview}
                    alt={defaultValues.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Camera className="size-6 text-white" />
                </div>
              </button>
            </FileUploadTrigger>

            <div className="space-y-1">
              <p className="text-sm font-medium">Profile Photo</p>
              <p className="text-muted-foreground text-xs">
                Click the avatar to upload a new photo
              </p>
              <p className="text-muted-foreground text-xs">
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>

          {avatarFiles.length > 0 && (
            <FileUploadList className="mt-3">
              {avatarFiles.map((file, index) => (
                <FileUploadItem
                  key={index}
                  value={file}
                  className="bg-muted/30 rounded-lg border p-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <FileUploadItemDelete asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <X className="size-4" />
                    </Button>
                  </FileUploadItemDelete>
                </FileUploadItem>
              ))}
            </FileUploadList>
          )}
        </FileUpload>
        <div className="max-h-60 space-y-7 overflow-y-scroll px-4 py-9">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              defaultValue={defaultValues.username}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={defaultValues.email}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label>Password</Label>
            <Button>Update Password</Button>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <Label>Share Profile</Label>
              <Switch checked={true}></Switch>
            </div>
            <Button>Share profile</Button>
          </div>
        </div>
      </UserProfileCardContent>
      <UserProfileCardFooter className="flex justify-center gap-2">
        <Button>Save Changes</Button>
      </UserProfileCardFooter>
    </UserProfileCard>
  );
};
