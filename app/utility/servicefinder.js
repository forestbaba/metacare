function ServiceFinder() {
    this.dependencyMap = {};
    this.dependencyCache = {};
  }
  
  
  ServiceFinder.prototype.register = function register(dependencyName, constructor) {
    if (typeof constructor !== "function") {
      throw new Error(`${dependencyName}: Dependency constructor is not a function`);
    }
  
    if (!dependencyName) {
      throw new Error("Invalid dependency name provided");
    }
  
    this.dependencyMap[dependencyName] = constructor;
  };
  

  ServiceFinder.prototype.get = function get(dependencyName) {
    if (this.dependencyMap[dependencyName] === undefined) {
      throw new Error(`${dependencyName}: Attempting to retrieve unknown dependency`);
    }
  
    if (typeof this.dependencyMap[dependencyName] !== "function") {
      throw new Error(`${dependencyName}: Dependency constructor is not a function`);
    }
  
    if (this.dependencyCache[dependencyName] === undefined) {
      const dependencyConstructor = this.dependencyMap[dependencyName];
      const dependency = dependencyConstructor(this);
      if (dependency) {
        this.dependencyCache[dependencyName] = dependency;
      }
    }
  
    return this.dependencyCache[dependencyName];
  };
  
  
  ServiceFinder.prototype.getMany = function getMany(...dependencyNames) {
    const dependencies = {};
    dependencyNames.forEach(dependencyName => {
      dependencies[dependencyName] = this.get(dependencyName);
    });
  
    return dependencies;
  }
  
  ServiceFinder.prototype.getAll = function getAll() {
    const dependencies = Object.keys(this.dependencyMap);
    dependencies.forEach((key) => {
      this.get(dependencies[key]);
    });
  
    return this.dependencyCache;
  };
  
  
  ServiceFinder.prototype.clear = function clear() {
    this.dependencyCache = {};
    this.dependencyMap = {};
  };
  
  
  module.exports = new ServiceFinder();
  