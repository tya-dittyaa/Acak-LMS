<?php

namespace App\Services;

use Exception;
use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;
use Google\Service\Drive\DriveFile as DriveFileMetadata;

class DriveService
{
  public function randomizeKey(): string
  {
    $apiKeys = [
      storage_path('keys/acakmaya-lms-fe26be8265d3.json'),
    ];

    return $apiKeys[array_rand($apiKeys)];
  }

  public function authorize(): Client
  {
    $keyFilePath = $this->randomizeKey();

    $client = new Client();
    $client->setAuthConfig($keyFilePath);
    $client->addScope(Drive::DRIVE);
    return $client;
  }

  public function getDrive(): Drive
  {
    $client = $this->authorize();
    return new Drive($client);
  }

  public function uploadFile(string $fileName, $file, string $folderId): \Google\Service\Drive\DriveFile
  {
    $drive = $this->getDrive();

    // Create the file metadata
    $fileMetadata = new DriveFileMetadata();
    $fileMetadata->setName($fileName);
    $fileMetadata->setMimeType($file->getMimeType());
    $fileMetadata->setParents([$folderId]);

    // Get the file content
    $fileContent = file_get_contents($file->getRealPath());

    // Prepare the media data
    $media = [
      'mimeType' => $file->getMimeType(),
      'uploadType' => 'multipart',
      'data' => $fileContent, // Pass file content as a string
    ];

    // Upload the file
    $result = $drive->files->create($fileMetadata, $media);

    return $result;
  }

  public function deleteFile(string $fileId): bool
  {
    $drive = $this->getDrive();

    try {
      $drive->files->delete($fileId);
      return true;
    } catch (Exception $e) {
      dd($e->getMessage());
      return false;
    }
  }

  public function getAvatarFolderId(): string
  {
    return '19ImLrnZ81IYFE6r2tzNjUYCw5yd8tST2';
  }

  public function getTeamIconFolderId(): string
  {
    return '1QJGAbeYQOp_nB8SFoJ12P16sw8ci4XZN';
  }

  public function getImageLink(string $fileId): string
  {
    return "https://lh3.googleusercontent.com/d/{$fileId}";
  }

  public function getFileIdFromUrl($url)
  {
    if (preg_match('/d\/([a-zA-Z0-9_-]+)/', $url, $matches)) {
      return $matches[1];
    }
    return null;
  }
}
