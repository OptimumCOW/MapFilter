﻿using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace WhaleSpotting.Models.DbModels
{
    public class WhaleSpottingContext: ApiAuthorizationDbContext<UserDbModel>
    {
        //public WhaleSpottingContext(DbContextOptions<WhaleSpottingContext> options) : base(options)
        //{
        //}
        public WhaleSpottingContext(
            DbContextOptions<WhaleSpottingContext> options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet<SightingDbModel> Sightings { get; set; }
    }
}