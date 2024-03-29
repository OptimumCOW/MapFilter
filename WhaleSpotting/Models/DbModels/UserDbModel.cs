﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhaleSpotting.Models.DbModels
{
    [Table("Users")]
    public class UserDbModel : IdentityUser
    {
        public ICollection<SightingDbModel> Sightings { get; set; }
    }
}
