# STRIVE Fantasy Module
Adds a new attribute, new skills and assets for use in **STRIVE**. 

See also the companion repository that contains the fantasy module: https://github.com/CodeWringer/strive-ttrpg/blob/develop/documents/en/fantasy-rules.md

# Build & Deploy
1. Increase the `version` number in the `module.json` and `package.json` on branch `develop`. 
2. Create a new **signed** tag on branch `develop` with the corresponding version, using the semantic versioning scheme `vMAJOR.MINOR.PATCH`, e. g. `v1.3.2`. 
3. Run npm script `build`, then upload the resulting `build/system.json` and `build/system.zip` to a new release on GitHub, whose name is the version name, e. g. `v1.3.2`. 
4. Create a pull request to merge `develop` into branch `main`. 
