<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class TeamService
{
  public function getTeamsForUser($userId)
  {
    return DB::table("teams")
      ->join("teams_mapping", "teams.id", "=", "teams_mapping.teams_id")
      ->join("teams_roles", "teams_mapping.role_id", "=", "teams_roles.id")
      ->where("teams_mapping.member_id", $userId)
      ->select("teams.*", "teams_roles.name as role_name")
      ->get();
  }
}
